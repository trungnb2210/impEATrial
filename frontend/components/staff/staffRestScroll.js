import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from "react-native-dynamic-search-bar";
import Item from "./staffItem";
const initData = require('../../../backend/json/restaurantTags.json')

export default function StaffRestScroll(props) {

  useEffect(() => {
    async function getData() {
      try {
        const restTags = JSON.parse(await AsyncStorage.getItem('@restaurantTags'));
        if(restTags !== null) {
          setFullData(restTags);
          setData(restTags);
        } else {
          alert("Error Fetching Data");
        }
      } catch(e) {
        alert("Error Fetching Data")
      }
    }
    if(!bootedUp) {
      getData(); 
      setBootedUp(true);
    }
    initData.forEach((item) => {
      if (props.checkedRest[item.id - 1]) {
        props.setRest(item.name);
        console.log(item.name)
      }
    })
   })


  const [fullData, setFullData] = useState();
  const [data, setData] = useState();
  const [userInput, setUserInput] = useState("");
  const [bootedUp, setBootedUp] = useState(false);

  const changeText = (input) => {
    setUserInput(input);
    input = input.toLowerCase();
    const checkStart = (item) => {
        return (item.startsWith(input))
      }
    setData(fullData.filter(item => item.name.toLowerCase().split(" ").some(checkStart)));
  }

  const renderItem = ({item}) => {
    return (
    <Item checked={props.checkedRest[item.id - 1]} name={item.name} type={item.type} id={item.id} changeCheckedRest={props.changeCheckedRest} />
    );
  };


  return (
    <View style={styles.container}>
        <SearchBar
            placeholder="Search Restaurants"
            value={userInput}
            onChangeText={(text) => changeText(text)}
            onClearPress={() => changeText("")}
        />
        { data && fullData ?
        data.length !== 0 ? 
          <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.fl}
      />
        :
        <View style={styles.nrf}>
          <Text>No results found</Text>
        </View> :
        <View style={styles.nrf}>
          <Text>Loading...</Text>
        </View>
        }
    </View> 
  )
}

const styles = StyleSheet.create({
    container: {
        height: 215,
        marginBottom: 0
    },
    fl: {
        padding: 20,
        marginTop: 0,
        height: "100%",
        paddingVertical: 0,
        marginBottom: 10
    },
    nrf: {
      height: "100%",
      marginTop: -18,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    },
    item: {
      paddingHorizontal: 10,
      height: 50,
      marginVertical: 8,
      marginHorizontal: 8,
      backgroundColor: '#ffffff',
      borderRadius: 30,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    },
    checkbox: {
      height: 25,
      width: 25
    },
    name: {
      fontSize: 20,
    },
    location: {
      fontSize: 15
    },
    waitTime: {
      fontSize: 15
    },
  });
  