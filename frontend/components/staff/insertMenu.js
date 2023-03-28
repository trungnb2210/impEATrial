import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import {Entypo, FontAwesome5} from 'react-native-vector-icons';
import SearchBar from "react-native-dynamic-search-bar";
import checkbox from '../../assets/icon-checkbox.png';
import checkboxChecked from '../../assets/icon-checkbox-checked.png';
import axios from 'axios';
import Config from '../../../backend/config';
const initData = require('../../../backend/json/restaurantTags.json')

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Config.gptAPIKey}`,
  },
});

export default function InsertMenu(props) {
   const [userInput, setUserInput] = useState("");
   const [userInput2, setUserInput2] = useState(0.0);
   const [gf, setGf] = useState(false);
   const [v, setV] = useState(false);
   const [vg, setVg] = useState(false);
   const [food, setFood] = useState();
   const [ingredient, setIngredient] = useState();
   const [cuisine, setCuisine] = useState();
   const [flavour, setFlavour] = useState();
  
   async function generateTags() {
    const params = {
      prompt: `Give me the two main ingredients, main cuisine, and main flavour of a '${userInput}' in the format ["ingredient 1", "ingredient 2", "cuisine", "flavour"]`,
      model: 'text-davinci-003',
      max_tokens: 500,
      temperature: 0,
    };

    await client
      .post('https://api.openai.com/v1/completions', params)
      .then((result) => {
        const res = JSON.parse(result.data.choices[0].text);
        console.log(res);
        setFood(res[0]);
        setIngredient(res[1]);
        setCuisine(res[2]);
        setFlavour(res[3]);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }


  async function updateDatabase() {
    const url = `${Config.localtunnel}/menuitems`;
    const tagsCommaSeparated = [food, ingredient, cuisine, flavour].join(', ');
    

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant: props.rest,
        item: userInput,
        price: userInput2,
        glutenFree: gf,
        vegetarian: vg,
        vegan: v,
        tags: tagsCommaSeparated,
        nutrients: 'Fats, Carbohydrates, Magnesium, Iron',
      }),
    });
    const resultJson = await result.json();
    console.log(`Item inserted: ${userInput}`);
  }


   const changeText = (input) => {
    setUserInput(input);
  }

  const changeText2 = (input) => {
    setUserInput2(input)
  }

  return (
    <View>
            <SearchBar
                placeholder="Product Name"
                value={userInput}
                searchIconComponent = {<Entypo name = "pencil" size = {23}/>}
                onClearPress={() => changeText("")}
                onChangeText = {(text) => changeText(text)}
                style = {styles.searchbar}
            />
            <SearchBar
                placeholder="Price"
                value={userInput2}
                searchIconComponent = {<FontAwesome5 name = "pound-sign" size = {23}/>}
                onClearPress={() => changeText2("")}
                onChangeText = {(text) => changeText2(text)}
                style = {styles.searchbar}
            />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => setGf(!gf)}>
            <Image style={styles.checkbox} source={gf ? checkboxChecked : checkbox} onPress />
          </TouchableOpacity>
          <Text style={{fontSize: 20}}>GF</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => setV(!v)}>
            <Image style={styles.checkbox} source={v ? checkboxChecked : checkbox} onPress />
          </TouchableOpacity>
          <Text style={{fontSize: 20}}>V</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => setVg(!vg)}>
            <Image style={styles.checkbox} source={vg ? checkboxChecked : checkbox} onPress />
          </TouchableOpacity>
          <Text style={{fontSize: 20}}>VG</Text>
          </View>
        </View> 
        <View>
            <TouchableOpacity style={[styles.item]} onPress={generateTags}>
                <Text style = {styles.title}>
                Generate tags
                </Text> 
            </TouchableOpacity>
        <View style = {styles.container}>
            <View style = {styles.row}>
                <View style={[styles.ft]}>
                    <Text style = {styles.filterTag}>
                      { food ? food : `Food?`}
                    </Text> 
                 </View>
                 <View style={[styles.ft2]}>
                    <Text style = {styles.filterTag}>
                      { ingredient ? ingredient : `Ingredient?`}
                    </Text> 
                 </View>
            </View>
            <View style = {styles.row}>
                <View style={[styles.ct]}>
                    <Text style = {styles.filterTag}>
                      { cuisine ? cuisine : `Cuisine?`}
                    </Text> 
                 </View>
                 <View style={[styles.flt]}>
                    <Text style = {styles.filterTag}>
                      {flavour ? flavour : `Flavour?`}
                    </Text> 
                 </View>
            </View>
        </View>
        <TouchableOpacity style={[styles.item]} onPress={() => updateDatabase()}>
            <Text style = {styles.title}>
              Update database
            </Text> 
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    },
    bar: {
        flexDirection: "row",
        alignItems: "center",
    },
    row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5
    },

    ft : {
        backgroundColor : '#8CD5FE',
        paddingHorizontal: 10,
        height: 50,
        marginVertical: 8,
        marginHorizontal: 0,
        borderRadius: 10,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        width: 175
    },
    ft2 : {
        backgroundColor : '#FFE792',
        paddingHorizontal: 10,
        height: 50,
        marginVertical: 8,
        marginHorizontal: 0,
        borderRadius: 10,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        width: 175
    },
    ct : {
        backgroundColor : "#6EEAA0",
        paddingHorizontal: 10,
        height: 50,
        marginVertical: 8,
        marginHorizontal: 0,
        borderRadius: 10,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        width: 175
    },
    flt : {
        backgroundColor : '#FFA5E6',
        paddingHorizontal: 10,
        height: 50,
        marginVertical: 8,
        marginHorizontal: 0,
    borderRadius: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: 175
    },
    item: {
    paddingHorizontal: 10,
    height: 50,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterTag: {
    fontWeight: "480",
    fontSize: 15,
    alignText: 'center'
  },
  searchbar: {
    marginBottom: 10
  },
  checkbox: {
    height: 25,
    width: 25
  }
  });
  