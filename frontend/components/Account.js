import React, { useState } from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity, SafeAreaView, TextInput} from 'react-native'
import {AntDesign, Entypo, MaterialCommunityIcons, Feather, Fontisto, FontAwesome, Ionicons} from 'react-native-vector-icons';

export default function Account(props) {
  return (
    <SafeAreaView>
      <Text style = {styles.title}>
          Account Details
      </Text>
      <View style = {styles.imageframe}> 
        <Image source = {require("../assets/photo.png")} style = {styles.image}/>
      </View>
      <View style = {styles.externalcontainer}>
        
        <View style = {styles.inputcontainer}> 
          <MaterialCommunityIcons name = "gender-transgender" size = {30}/>
          <TextInput
            style={styles.input}
            onChangeText={props.onChangeGender}
            value={props.gender}
            placeholder = "Gender"
          />
          <Entypo name = "pencil" size = {23} color = "#d3d3d3"/>
        </View>
        <View style = {styles.inputcontainer}> 
          <Fontisto name = "person" size = {30}/>
          <TextInput
            style={styles.input}
            onChangeText={props.onChangePronouns}
            value={props.pronouns}
            placeholder = "Pronouns"
          />
          <Entypo name = "pencil" size = {23} color = "#d3d3d3"/>
        </View>
        <View style = {styles.inputcontainer}> 
          <Feather name = "phone" size = {25}/>
          <TextInput
            style={styles.input}
            onChangeText={props.onChangeNumber}
            value={props.phone}
            placeholder = "Phone Number"

          />
          <Entypo name = "pencil" size = {23} color = "#d3d3d3"/>
        </View>

        <View style = {styles.inputcontainer}> 
          <AntDesign name = "instagram" size = {28}/>
          <TextInput
            style={styles.input}
            onChangeText={props.onChangeInsta}
            value={props.insta}
            placeholder = "Instagram"

          />
          <Entypo name = "pencil" size = {23} color = "#d3d3d3"/>
        </View>
        <View style = {styles.inputcontainer}> 
          <Entypo name = "book" size = {28}/>
          <TextInput
            style={styles.input}
            onChangeText={props.onChangeCourse}
            value={props.course}
            placeholder = "Course"
            
          />
          <Entypo name = "pencil" size = {23} color = "#d3d3d3"/>
        </View>
        <View style = {styles.inputcontainer}> 
          <Ionicons name = "school" size = {28}/>
          <TextInput
            style={styles.input}
            onChangeText={props.onChangeYear}
            value={props.year}
            placeholder = "Year Level"
            
          />
          <Entypo name = "pencil" size = {23} color = "#d3d3d3"/>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28,
        marginBottom: 30,
      },
    input: {
        height: 40,
        width: 170,
        margin: 12,
        borderWidth: 0,
        padding: 10,
        fontSize: 18
      },
    inputcontainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    externalcontainer: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    image: {
      resizeMode : "contain",
      width: 200,
      height: 200,
      borderRadius: 100 
    },
    imageframe: {
      alignItems: "center",
      marginBottom: 20
    }
    
})