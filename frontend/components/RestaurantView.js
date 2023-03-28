import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";

//only weekday right now

export default function RestaurantView(props) {
  function getOpeningTime() {
    const ow = new Date(props.openingTimeWeekday);
    let hours = ow.getHours();
    let minutes = ow.getMinutes();
    if(parseInt(hours) < 10) {
        hours = "0" + hours;
    }
    if(parseInt(minutes) < 10) {
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  }

  function getClosingTime() {
    const ow = new Date(props.closingTimeWeekday);
    let hours = ow.getHours();
    let minutes = ow.getMinutes();
    if(parseInt(hours) < 10) {
        hours = "0" + hours;
    }
    if(parseInt(minutes) < 10) {
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  }

  function pressedRest() {
    props.getModalData(props.restaurant, props.openingTimeWeekday, props.closingTimeWeekday, props.building, props.waitTime, props.tag1, props.tag2, props.tag3, props.tag4, props.image);
    props.toggleModal();
  }

  return (
    <TouchableOpacity style={[styles.item]} onPress={pressedRest}>
        <Image source = {props.image} style = {styles.image}/>
        <View style={styles.totalR}>
        <View style={styles.overlay}>
        <View style={styles.sc}>
          <Text style = {[styles.name]}>
            {props.restaurant}
            </Text>
       </View>
        <View style={styles.restInfo}>
        <Text style = {styles.rest}>
            {props.waitTime} mins
        </Text>
        <Text style = {styles.rest}>
            {getOpeningTime()} - {getClosingTime()}
        </Text>
        <Text style = {styles.rest}>
            {props.building}
        </Text>

        </View>
        </View>
        <View style = {styles.tagsHolder}>
        <View style = {[styles.tags, styles.tag1]}>
            <Text style = {styles.tagst}>{props.tag1}</Text>
        </View>
        <View style = {[styles.tags, styles.tag2]}>
            <Text style = {styles.tagst}>{props.tag2}</Text>
        </View>
        <View style = {[styles.tags, styles.tag3]}>
            <Text style = {styles.tagst}>{props.tag3}</Text>
        </View>
        <View style = {[styles.tags, styles.tag4]}>
            <Text style = {styles.tagst}>{props.tag4}</Text>
        </View>
        </View>
        </View>
    </TouchableOpacity>
  )
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
    alignItems: 'center'
  },
  overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 240,
    height: 75
  },
  sc: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  image: {
    width: 80,
      height:80,
      borderWidth:2,
      borderColor:'#FFFFFF',
      margin:8,
      borderRadius: 15,
  },
  checkbox: {
    height: 25,
    width: 25
  },
  name: {
    fontSize: 16,
    marginHorizontal: 8,
    fontWeight: 'bold',
    maxWidth: 100
  },
  rest: {
    fontSize: 15,
  },
  restInfo: {
    height: 75,
    marginLeft: 30,
    justifyContent: 'space-around'
  },
  tagsHolder: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tags: {
    marginLeft: 8,
    borderRadius: 5,
    paddingHorizontal: 5
  },
  tag1: {
    backgroundColor: "#6EEAA0"
  },
  tag2: {
    backgroundColor: '#FFA5E6'
  },
  tag3: {
    backgroundColor: '#8CD5FE'
  },
  tag4: {
    backgroundColor: '#8CD5FE'
  },
  tagst: {
    fontSize: 10
  }
})