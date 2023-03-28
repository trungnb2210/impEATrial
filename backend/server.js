const { Client } = require('pg');
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const Config = require('./config');
const routesHandler = require('./routes/handler');
const menuItems = require('./json/menuitems.json');
const restaurants = require('./json/restaurants.json');

const app = express();
app.use('/', routesHandler);
app.use(cors());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const client = new Client(Config.db);
client.connect();

async function initDB() {
  const queries = fs.readFileSync('./backend/dbinit.sql').toString().split(';')
    .filter((query) => query !== '')
    .map((query) => query.trim());
  queries.forEach((query) => client.query(query));
  console.log('Database initialised');
}

async function insertRestaurant({
  restaurant,
  location,
  openingTimeWeekday,
  closingTimeWeekday,
  openingTimeWeekend,
  closingTimeWeekend,
  // Top four tags of food items offered at restaurant
  tag1,
  tag2,
  tag3,
  tag4,
}) {
  const [latitude, longitude] = location.split(',').map((s) => parseFloat(s.trim()));
  const tagsCommaSeparated = [tag1, tag2, tag3, tag4].join(', ');
  const times = [
    openingTimeWeekday,
    closingTimeWeekday,
    openingTimeWeekend,
    closingTimeWeekend,
  ].map((timeString) => timeString.slice(11, 23));
  client.query(
    ` INSERT INTO restaurants 
      SELECT $1, 
             $2, 
             $3, 
             CAST($4 AS TIME), 
             CAST($5 AS TIME), 
             CASE $6 WHEN '' THEN NULL ELSE CAST($6 AS TIME) END, 
             CASE $7 WHEN '' THEN NULL ELSE CAST($7 AS TIME) END,
             $8
      WHERE NOT EXISTS (SELECT * FROM restaurants WHERE restaurant = $1)`,
    [restaurant, latitude, longitude, ...times, tagsCommaSeparated],
  );
}

function stringToArray(string) {
  if (string === undefined) {
    return '';
  }
  return string.toString().split(', ').map((elem) => elem.toLowerCase()).join(', ');
  
}

async function insertRestaurants() {
  restaurants.forEach(insertRestaurant);
  console.log('Restaurants inserted');
}

async function insertMenuItem({
  restaurant, fooddrink, item, price, glutenFree, vegetarian, vegan, tags, nutrients, date,
}) {
  const tagsCommaSeparated = stringToArray(tags);
  const nutrientsCommaSeparated = stringToArray(nutrients);
  client.query(
    `INSERT INTO menuitems
     SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
     WHERE NOT EXISTS (SELECT * FROM menuitems WHERE restaurant = $1 AND item = $2)`,
    [
      restaurant,
      item,
      fooddrink,
      price,
      glutenFree,
      vegetarian,
      vegan,
      tagsCommaSeparated,
      nutrientsCommaSeparated,
      date,
    ],
  );
}

async function insertMenuItems() {
  menuItems.forEach(insertMenuItem);
  console.log('Menu items inserted');
}

async function printRestaurants() {
  const restaurantDB = await client.query('SELECT * FROM restaurants');
  console.log(restaurantDB.rows);
}

async function printMenuItems() {
  const menuItemsDB = await client.query('SELECT * FROM menuitems');
  console.log(menuItemsDB.rows);
}

function deleteEverything() {
  client.query('DELETE FROM menuitems');
  client.query('DELETE FROM restaurants');
}

// initDB();

// deleteEverything();

// insertRestaurants();
// insertMenuItems();

// console.log('Everything inserted');

// printRestaurants();
// printMenuItems();
