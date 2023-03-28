import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import checkbox from '../../../assets/icon-checkbox.png'
import checkboxChecked from '../../../assets/icon-checkbox-checked.png';


export default function Item(props) {
  const [checked, setChecked] = useState(props.checked);
  const clickedBox = () => {
    props.changeChecked(props.id);
    setChecked(!checked);
  }

  let backgroundColor;
  switch(props.type) {
    case "flavour":
        backgroundColor = '#37E351';
        break;
    case "food":
        backgroundColor = '#E35B37';
        break
    case "ingredients":
        backgroundColor = "#37E3D9";
        break;
    case "drink":
        backgroundColor = "#f9c2ff";
        break;
    case "cuisine":
        backgroundColor = "#2189F2";
        break;
    default:
        backgroundColor = "#ffffff";
  }
  return (
    <TouchableOpacity onPress={clickedBox} style={[styles.item, {backgroundColor}]}>
        <View>
        <Text style = {[styles.name]}>
            #{props.name}
        </Text>
        <Text>
            {props.type}
        </Text>    
        </View>
        <Image style={styles.checkbox} source={checked ? checkboxChecked : checkbox} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    item: {
      paddingHorizontal: 10,
      height: 50,
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
    }
  });
  