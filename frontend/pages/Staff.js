import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import StaffRestScroll from '../components/staff/staffRestScroll';
import InsertMenu from '../components/staff/insertMenu';
const initData = require('../../backend/json/restaurantTags.json')


export default function Staff(props) {
  const [rest, setRest] = useState('');

  return (
    <View>
        <Text style = {styles.title}>
          Select Restaurants
      </Text>
      <View style = {styles.scrollsection}>
        <StaffRestScroll checkedRest={props.checkedRest} changeCheckedRest={props.changeCheckedRest} setRest = {setRest} />
      </View>
      <Text style = {styles.title}>
          Add To Menu
      </Text>
      <View>
        <InsertMenu rest = {rest}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: "100%"
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 0,
    marginBottom: 5
  },
  scrollsection: {
    marginTop: 0,
  }
});
