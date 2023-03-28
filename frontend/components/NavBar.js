import { StyleSheet, View } from 'react-native'
import { Dimensions } from 'react-native';
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const NavBar = (props) => {
    const color = (icon) => {
        switch (icon) {
            case 'nav':
                if (props.currPage === 'nav') {
                    return '#25aa72'
                } else {
                    return '#c4c4c4'
                }
            case 'home':
                if (props.currPage === 'home') {
                    return '#25aa72'
                } else {
                    return '#c4c4c4'
                }
            case 'staff':
                if (props.currPage === 'staff') {
                    return '#25aa72'
                } else {
                    return '#c4c4c4'
                }
            case 'friends':
                if (props.currPage === 'friends') {
                    return '#25aa72'
                } else {
                    return '#c4c4c4'
                }
        }
    }
    const changePage = (newPage) => {
        
        props.setCurrView(newPage)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => changePage('friends')}>
                <FontAwesome5 name={'user-friends'} solid size={windowWidth / 11} color={color('friends')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changePage('home')}>
                <MaterialIcons name={'recommend'} solid size={windowWidth / 11} color={color('home')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changePage('nav')}>
                <Ionicons name='restaurant-outline' size={windowWidth / 11} color={color('nav')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changePage('staff')}>
                <MaterialCommunityIcons name='account' size={windowWidth / 11} color={color('staff')} />
            </TouchableOpacity>
        </View>
    )
}

export default NavBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight / 12,
    }
})