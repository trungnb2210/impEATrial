import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import Slider from '@react-native-community/slider';
import {Entypo, FontAwesome5} from 'react-native-vector-icons';
import checkbox from '../../assets/icon-checkbox.png';
import checkboxChecked from '../../assets/icon-checkbox-checked.png';

export default function Preferences(props) {
  const price = props.price;
  const setPrice = props.onChangePrice;
  const time = props.waittime;
  const setTime = props.onChangeTime;
  const checkedVeg = props.veg;
  const setChecked1 = props.onChangeVeg;
  const checkedVegan = props.vegan;
  const setChecked2 = props.onChangeVegan;
  const checkedGluten = props.gluten;
  const setChecked3 = props.onChangeGluten;

  return (
    <View>
      <Text style = {styles.title}>
          Preferences
      </Text>
    <View style = {styles.filtersOne}>
      <View style= {styles.labelView}>
        <Text style = {styles.label}> 
          Price?
        </Text>
        <Text style = {styles.label}>
        £ {Math.floor(price)} 
        </Text>
      </View>
      <Slider
        style={{width: 300, height: 40}}
        value = {price}
        minimumValue={0}
        maximumValue={50}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#d3d3d3"
        onSlidingComplete = {(value) => setPrice(value)}
      />
      <View style= {styles.labelView}>
        <Text style = {styles.label}> 
          Wait-time?
        </Text>
        <Text style = {styles.label}>
        {Math.floor(time)} min
        </Text>
      </View>
      <Slider
        style={{width: 300, height: 40}}
        value = {time}
        minimumValue={0}
        maximumValue={60}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#d3d3d3"
        onSlidingComplete = {(value) => setTime(value)}
      />
      <View>
        <TouchableOpacity onPress={() => setChecked1(!checkedVeg)} style={[styles.item]}>
          <Entypo name = "leaf" size = {30} color = {"#019042"}/>
            <Text style = {styles.filterTag}>
              Vegetarian
            </Text> 
          <Image style={styles.checkbox} source={checkedVeg ? checkboxChecked : checkbox}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setChecked2(!checkedVegan)} style={[styles.item]}>
          <FontAwesome5 name = "seedling" size = {30} color = {"#017033"}/>
            <Text style = {styles.filterTag}>
              Vegan
            </Text> 
          <Image style={styles.checkbox} source={checkedVegan ? checkboxChecked : checkbox}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setChecked3(!checkedGluten)} style={[styles.item]}>
          < FontAwesome5 name = "bread-slice" size = {30} color = {"#c68958"}/>
            <Text style = {styles.filterTag}>
              Gluten-Free
            </Text> 
          <Image style={styles.checkbox} source={checkedGluten ? checkboxChecked : checkbox}/>
        </TouchableOpacity>
      </View>
    </View>
  </View>
      
  )
}
    

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 0,
  },
  filtersOne: {
    marginTop: 22,
    marginBottom: 12,
    flexDirection: "column"
  },
  labelView: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  label: {
    alignSelf: 'left',
    fontWeight: "450",
    fontSize: 18,
    marginBottom: 10
  }, 
  filterTag: {
    fontWeight: "480",
    fontSize: 18
  },
  item: {
    paddingHorizontal: 10,
    height: 50,
    marginVertical: 8,
    marginHorizontal: 0,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 5
  }, 
})