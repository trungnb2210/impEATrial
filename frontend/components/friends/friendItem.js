import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';


export default function FriendItem(props) {
    const photos = ([
        require('../../assets/malhar.png'),
        require('../../assets/malhar.png'),
        require('../../assets/justin.png'),
        require('../../assets/aboud.png'),
        require('../../assets/tao.png'),
        require('../../assets/darius.png'),
        require('../../assets/chunyiu.png'),
        require('../../assets/jack.png'),
        require('../../assets/anson.png'),
        require('../../assets/josh.png')
      ]);

    function getTag() {
        let string = "";
        if (props.gluten) {
          string += "GF"
        } 
        if(props.veg) {
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
        if (!props.vegan && !props.veg && !props.gluten) {
            string = "No allergies"
        }
        return string;
      }

    function openModal() {
        props.getData(props.gender, props.pronoun, props.phone, props.insta, props.course, props.year,props.id, props.name);
        props.toggleModal();
    }

  return (
    <TouchableOpacity style={[styles.container]} onPress = {openModal}>
            <View style = {styles.middle}> 
                <Image source = {photos[props.id]} style = {styles.pic}/>
                <Text style = {styles.name}> {props.name} </Text>
                <Text style = {styles.tags}> {getTag()} </Text>
            </View>
            <View style = {styles.gotogether}>
                <Text style = {styles.label2}> Let's grab lunch at ... </Text>
                <Text style = {styles.label}> {props.first} </Text>
            </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        backgroundColor: "#e6e6e6",
        height: 150,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20
    },
    textcontain: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center"
    },
    name: {
      fontSize: 20,
    },
    pic : {
      resizeMode : "stretch",
      width: 100,
      height: 100,
      borderRadius: 50 
    },
    name: {
        fontWeight: "bold",
        fontSize: 15
    },
    tags :{
        fontSize: 15

    },
    middle : {
        paddingHorizontal: 5,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 0
    }, 
    label : {
        fontWeight: "bold",
        fontSize: 20
    },
    label2: {
        fontStyle: "italic",
        fontSize: 15
    },
    gotogether: {
        alignItems: "right",
        flexDirection: "vertical",
        justifyContent: "flex-end",
        paddingVertical: 10,
        marginHorizontal: 10
    }
  });
  