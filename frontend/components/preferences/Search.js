import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Item from "./search/Item"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const DATA = require('../../../backend/json/preferencestags.json');
// Could use AsyncStorage for this to reduce database reads and writes.
// Could use AsyncStorage for this to reduce database reads and writes.

export default function Search(props) {
  useEffect(() => {
    async function getData() {
      try {
        const prefTags = JSON.parse(await AsyncStorage.getItem('@preferenceTags'));
        if(prefTags !== null) {
          setFullData(prefTags);
          setData(prefTags);
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
  })

  const [fullData, setFullData] = useState();
  const [data, setData] = useState();
  const [userInput, setUserInput] = useState("");
  const [bootedUp, setBootedUp] = useState(false);


  const changeText = (input) => {
    setUserInput(input);
    if(input) {
      input = input.toLowerCase().replace(/\s+/g, '');
    }
    setData(fullData.filter(item => item ? item.name.toLowerCase().startsWith(input) : false));
  } 

  const renderItem = ({item}) => {
    return (
    <Item checked={props.checked[item.id-1]} name={item.name} type={item.type} id={item.id} changeChecked={props.changeChecked} />
    );
  };

  return (
    <View style={styles.container}>
        <SearchBar
            placeholder="Search Tags"
            value={userInput}
            onChangeText={(text) => changeText(text)}
            onClearPress={() => changeText("")}
        />
        {
        data && props.checked && fullData ?
        (data.length !== 0 ? 
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.fl}
        />
        :
        <View style={styles.nrf}>
          <Text>No results found</Text>
        </View>) :
        <View style={styles.nrf}>
          <Text>Loading...</Text>
        </View>
        }
    </View> 
  )
}

const styles = StyleSheet.create({
    container: {
        height: 300
    },
    fl: {
        marginTop: 10,
        height: "100%"
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
      borderRadius: 10,
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
  