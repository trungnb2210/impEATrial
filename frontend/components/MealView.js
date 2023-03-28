import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function MealView(props) {
  function getTag() {
    let string = "";
    if (props.glutenFree) {
      string += "GF"
    } 
    if(props.vegetarian) {
      if(string.length > 0) {
        string += ", V";
      } else {
        string += "V";
      }
    } 
    if(props.vegan) {
      if(string.length > 0) {
        string += ", VG";
      } else {
        string += "VG";
      }
    }
    return string;
  }

  // useEffect(() => {
  //   console.log(props.item);
  // }, []);

  return (
    <TouchableOpacity style={[styles.item]}>
      <Image source={props.image} style={styles.photo} />
      <View style={styles.sc}>
        <View>
          <View style = {styles.toprow}>
            <Text style = {[styles.name]}>
              {props.item}
            </Text>
          </View>
          {props.id <= 3
          ?
          <View style = {styles.circle}>
            <Text style = {styles.text1}>{props.id}</Text>
          </View>
            : <View />
          }
          <Text style={styles.rest}>
              {props.restaurant}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infot}>£{props.price.toFixed(2)}</Text>
          <Text style={styles.infot}>{props.waittime} mins</Text>
          <Text style={styles.infot}>{getTag()}</Text>
        </View>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 8,
    backgroundColor: "#e6e6e6",
    height: 100,
    width: 350,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    flexDirection: 'row',
  },
  sc: {
    justifyContent: "space-between"
  },
  info: {
    flexDirection: 'row',
    marginBottom: 8,
    marginHorizontal: 8
  },
  photo: {
    marginTop: 10,
    height: 80,
    width: 80,
    backgroundColor: "white",
    borderRadius: 15
  },
  checkbox: {
    height: 25,
    width: 25
  },
  name: {
    fontSize: 16,
    width: 200,
    marginHorizontal: 8,
    marginTop: 10,
    fontWeight: 'bold'
  },
  rest: {
    marginHorizontal: 8,
    fontSize: 15,
  },
  infot: {
    marginRight: 50
  },
  toprow: {
    flexDirection: "row",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff8585",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: -8,
    left: 220
  },
  text1: {
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 22
  }
})