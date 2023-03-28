const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const Config = require('../config');

const router = express.Router();
router.use(cors()); // Enables CORS for fetch requests
router.use(bodyParser.json()); // Parse body for POST requests

// Returns all menu items on 5 Feb 2023
router.get('/menuitems', (req, res) => {
  const client = new Client(Config.db);
  client.connect();
  // Items with NULL dates are constant and won't change
  // Some places e.g. SCR will change menu every day
  // Disregard repeated menu items on multiple dates, for now
  client.query('SELECT * FROM menuitems WHERE (date = \'2023-02-05\') IS NOT FALSE', (err, response) => {
    if (err) throw err;
    const { rows } = response;
    res.send(rows);
  });
});

router.post('/menuitems', (req, res) => {
  const client = new Client(Config.db);
  client.connect();
  
  console.log(req.body);
  client.query(
    `INSERT INTO menuitems
     SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, NULL
     WHERE NOT EXISTS (SELECT * FROM menuitems WHERE restaurant = $1 AND item = $2)`,
    [
      req.body.restaurant,
      req.body.item,
      'Food',
      req.body.price,
      req.body.glutenFree,
      req.body.vegetarian,
      req.body.vegan,
      req.body.tags,
      req.body.nutrients
    ], (err, response) => {
      if (err) throw err;
      console.log('inserted')
      res.end("data inserted");
      },
  );
});

// router.post('/testInsert', (req, res) => {
//   const client = new Client(Config.db);
//   client.connect();
//   const { item } = req.body;
//   client.query('SELECT * FROM menuitems WHERE item = $1', [item], (err, response) => {
//     if (err) throw err;
//     const { rows } = response;
//     res.end(JSON.stringify(rows));
//   });
// });

// Returns the menu items served by the specified restaurant
router.post('/restaurants', (req, res) => {
  const client = new Client(Config.db);
  client.connect();
  const { restaurant } = req.body;
  client.query('SELECT * FROM menuitems WHERE restaurant = $1', [restaurant], (err, response) => {
    if (err) throw err;
    const { rows } = response;
    res.end(JSON.stringify(rows));
  });
});

router.post('/terra', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
