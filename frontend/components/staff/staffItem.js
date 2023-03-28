import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import checkbox from '../../assets/icon-checkbox.png';
import checkboxChecked from '../../assets/icon-checkbox-checked.png';


export default function Item(props) {
  const [checked, setChecked] = useState(props.checked);

  const alterChecked = () => {
    setChecked(!checked);
    props.changeCheckedRest(props.id);
  }

  const photos = ( [
    require ("../../assets/scr.png"),
    require ("../../assets/scr.png"), 
    require ("../../assets/h-bar.png"),
    require ("../../assets/kimiko.png"),
    require ("../../assets/library.png"),
    require ("../../assets/eastside.png"),
    require ("../../assets/neopizza.png"),
    require ("../../assets/loud.png"),
    require ("../../assets/roastery.png"),
    require ("../../assets/starbuck.png"),
    require ("../../assets/colcaf.png"),
  ])

  return (
    <TouchableOpacity onPress={alterChecked} style={[styles.item]}>
        <View style = {styles.container}>
          <Image source = {photos[props.id]} style = {styles.image}/>
          <Text style = {[styles.name]}>
            {props.name}
          </Text>   
        </View>
        <Image style={styles.checkbox} source={checked ? checkboxChecked : checkbox} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: 'center'
    },
    item: {
      paddingHorizontal: 10,
      height: 80,
      marginVertical: 8,
      marginHorizontal: 8,
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
    image : {
      width: 80,
      height:80,
      borderWidth:2,
      borderColor:'#FFFFFF',
      margin:8,
      borderRadius: 15,
    }
  });
  