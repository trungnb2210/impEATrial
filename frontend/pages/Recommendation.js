import { StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import MealView from '../components/MealView';
import Config from '../../backend/config';
import rankMenuItems from '../../backend/algorithm';

// Use this instead of menuItems if backend server not working
const DATA = require('../../backend/json/menuitems.json');

const testNutritionData = require('../../backend/json/testnutritiondata.json');
const recommendationMale = require('../../backend/json/recommendation_male.json');

export default function Recommendation({ checked, vegetarian, vegan, glutenFree }) {
  const [menuItems, setMenuItems] = useState([]);

  const images = {
    'Beef Roast with Yorkshire Pudding, Roast Potatoes & Mixed Vegetables': require('../assets/beef-roast.jpg'),
    '(SUMO) Salmon Teriyaki & Rice': require('../assets/teriyaki-salmon.webp'),
    'Bacon & Onion Pizza': require('../assets/bacon-onion-pizza.jpg'),
    'Mushroom & Onion Pizza': require('../assets/mushroom-onion-pizza.jpg'),
    'Pork Ribs & Chicken Wings': require('../assets/ribs-wings.webp'),
    'Chicken Curry & Rice': require('../assets/chicken-curry.jpg'),
    'Chickpea Curry & Basmati Rice, Naan, Veggie Samosas': require('../assets/chickpea-curry.jpg'),
    '(SUMO) Japanese Curry & Rice': require('../assets/japanese-curry.jpg'),
    'Japanese Curry & Rice': require('../assets/japanese-curry.jpg'),
    '(SUMO) Shrimp Fry Curry & Rice': require('../assets/japanese-curry.jpg'),
    'Thai Green Chicken Curry with Rice, Spring Rolls & Prawn Crackers': require('../assets/thai-green-curry-recipe.jpg'),
    'Mutton Railway Curry & Basmati Rice, Naan, Veggie Samosas': require('../assets/mushroom-curry.jpg'),
    Takoyaki: require('../assets/takoyaki.jpg'),
    testing: require('../assets/aboud.png'),
  };

  const renderItem = ({ item }) => (
    <MealView
      restaurant={item.restaurant}
      fooddrink={item.fooddrink}
      item={item.item}
      price={item.price}
      glutenFree={item.glutenFree}
      vegetarian={item.vegetarian}
      vegan={item.vegan}
      waittime={item.waittime}
      id={item.id}
      image={images[item.item] === undefined ? images.testing : images[item.item]}
    />
  );

  async function getMenuItems() {
    const url = `${Config.localtunnel}/menuitems`;
    const result = await fetch(url);
    const resultJson = await result.json();
    setMenuItems(resultJson);
  }

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={rankMenuItems(menuItems.filter((item) => (!vegan || item.vegan) && (!vegetarian || item.vegetarian) && (!glutenFree || item.gluten_free)), testNutritionData[5].data[0], recommendationMale, checked)}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={styles.fl}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '88%',
  },
});
