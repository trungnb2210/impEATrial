import {
  StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {Feather, Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons';
import Modal from 'react-native-modal';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';

import Preferences from './frontend/components/preferences/Preferences';
import NavBar from './frontend/components/NavBar';
import Recommendation from './frontend/pages/Recommendation';
import Restaurants from './frontend/pages/Restaurants';
import Search from "./frontend/components/preferences/Search";
import Staff from "./frontend/pages/Staff";
import Friends from "./frontend/pages/Friends";
import Account from "./frontend/components/Account";
import {LogBox} from 'react-native';
const initPrefData = require('./backend/json/preferencestags.json');
const initRestData = require('./backend/json/restaurantTags.json');

const windowWidth = Dimensions.get('window').width;

export default function App() {

  LogBox.ignoreAllLogs();
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    async function storePrefData() {
      try {
        const prefTags = await AsyncStorage.getItem('@preferenceTags');
        if(prefTags === null) {
          try {
            AsyncStorage.setItem('@preferenceTags', JSON.stringify(initPrefData));
            const checkedItems = [];
            for(let i = 0; i < initPrefData; i++) {
              checkedItems.push(initPrefData[i].checked);
            }
            setChecked(checkedItems);
          } catch(e) {
            alert('Server Side Error');
          }
        } else {
          const checkedItems = [];
          const parsedPrefTags = JSON.parse(prefTags);
          for(let i = 0; i < parsedPrefTags; i++) {
            checkedItems.push(parsedPrefTags[i].checked);
          }
          setChecked(checkedItems);
        }
      } catch(e) {
        alert("Server-Side Error")
      }
    }

    async function storeRestData() {
      try {
        const restTags = await AsyncStorage.getItem('@restaurantTags')
        if(restTags === null) {
          try {
            AsyncStorage.setItem('@restaurantTags', JSON.stringify(initRestData));
            const checkedItems = [];
            for(let i = 0; i < initRestData; i++) {
              checkedItems.push(initRestData[i].checked);
            }
            setCheckedRest(checkedItems);

          } catch(e) {
            alert('Server Side Error');
          }
        } else {
          const checkedItems = [];
          const parsedRestTags = JSON.parse(restTags);
          for(let i = 0; i < parsedRestTags; i++) {
            checkedItems.push(parsedRestTags[i].checked);
          }
          setCheckedRest(checkedItems);
        }
      } catch(e) {
        alert("Server-Side Error")
      }
    }
    storePrefData();
    storeRestData();
  }, []);


  const [currPage, setCurrPage] = useState('friends');
  const changePage = (newPage) => {
    setCurrPage(newPage);
  };
  const [visible, setVisible] = useState(false);
  const [visibleAcc, setVisibleAcc] = useState(false);
  const [checked, setChecked] = useState();
  const [checkedRest, setCheckedRest] = useState();


  const toggleModal = () => {
    setVisible(!visible);
  };

  const toggleModalAccount = () => {
    setVisibleAcc(!visibleAcc);
  };

  const changeChecked = (id) => {
    const newArr = checked;
    newArr[id - 1] = !newArr[id - 1]
    setChecked(newArr);
  }

  const changeCheckedRest = (id) => {
    const newArr = checked;
    newArr[id - 1] = !newArr[id - 1]
    setCheckedRest(newArr);
  }

  // Props for account preferences
  const [insta, onChangeInsta] = useState('');
  const [phone, onChangeNumber] = useState('');
  const [course, onChangeCourse] = useState('');
  const [year, onChangeYear] = useState('');
  const [pronouns, onChangePronouns] = useState('');
  const [gender, onChangeGender] = useState('');

  // Props for taste preferences (excluding tags)
  const [price, onChangePrice] = useState(0);
  const [waittime, onChangeTime] = useState(0);
  const [vegan, onChangeVegan] = useState(false);
  const [veg, onChangeVeg] = useState(false);
  const [gluten, onChangeGluten] = useState(false);

  // Terra connect
  async function connect() {
    const options = {
      method: 'POST',
      url: 'https://api.tryterra.co/v2/auth/generateWidgetSession',
      headers: {
        accept: 'application/json',
        'dev-id': 'testingTerra',
        'content-type': 'application/json',
        'x-api-key': 'ussv5SAQ53a1nNTxsMr9G41zj2KUhYMk5eDU1hjG',
      },
      data: {
        reference_id: 'angusleung',
        providers: 'FITBIT',
        language: 'en',
      },
    };
    const { data } = await axios.request(options);
    const { url } = data;
    function getData() {
      setFirstTime(false);
      return new Promise(function(res, rej) {
        WebBrowser.openBrowserAsync(url)
        setTimeout(res, 5200);
      }).then(function() {
        WebBrowser.dismissBrowser();
      })
    }
    if(firstTime) {
      getData();
    } else {
      await WebBrowser.openBrowserAsync(url);
    }
  }
  if(checked && checkedRest) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Ionicons name='fast-food-outline' size = {25}/>
          <Text style={styles.label}> impEATrial</Text>
        </View>
        <View style = {styles.options}>
          <TouchableOpacity onPress={() => connect()} style={styles.spacing}>
            <MaterialCommunityIcons name="link" size={windowWidth / 13} style={styles.settingsIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModalAccount} style = {styles.spacing}>
            <MaterialCommunityIcons name="account-box-outline" size={windowWidth / 13} style={styles.settingsIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Feather name="settings" size={windowWidth / 15} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        propagateSwipe={true}
        isVisible={visible}
        coverScreen
        onSwipeComplete={toggleModal}
        swipeDirection={['left', 'right']}
        backdropOpacity={0.6}
      >
        <View style={styles.modal}>
          <TouchableOpacity onPress={toggleModal} style = {styles.closeButtonContainer}>
            <Feather name="x" size={windowWidth / 15} style={styles.settingsIcon} />
          </TouchableOpacity>
          <Preferences
            price = {price}
            onChangePrice = {onChangePrice}
            waittime = {waittime}
            onChangeTime = {onChangeTime}
            vegan = {vegan}
            onChangeVegan = {onChangeVegan}
            veg = {veg}
            onChangeVeg = {onChangeVeg}
            gluten = {gluten}
            onChangeGluten = {onChangeGluten}
          />
          <Search
            checked = {checked}
            changeChecked = {changeChecked}
           />
        </View>
      </Modal>

      <Modal
        propagateSwipe={true}
        isVisible={visibleAcc}
        coverScreen
        onSwipeComplete={toggleModalAccount}
        swipeDirection={['left', 'right']}
        backdropOpacity={0.6}
      >
        <View style={styles.modal}>
          <TouchableOpacity onPress={toggleModalAccount} style = {styles.closeButtonContainer}>
            <Feather name="x" size={windowWidth / 15} style={styles.settingsIcon} />
          </TouchableOpacity>
          <Account 
            onChangeInsta={onChangeInsta} 
            onChangeNumber = {onChangeNumber} 
            onChangeCourse = {onChangeCourse} 
            onChangeYear = {onChangeYear}
            insta = {insta}
            phone = {phone}
            course = {course}
            year = {year}
            pronouns = {pronouns}
            onChangePronouns = {onChangePronouns}
            gender = {gender}
            onChangeGender = {onChangeGender}
            />
        </View>
      </Modal>

      {/* if/else based on navbar input recommendation / restaurants */}
      {currPage === 'home' ? <Recommendation checked={checked} vegan={vegan} vegetarian={veg} glutenFree={gluten}/> : currPage === 'nav' ? <Restaurants /> : currPage === 'friends'? <Friends veg = {veg} vegan = {vegan} gluten = {gluten} checked = {checked}/> : <Staff checkedRest={checkedRest} changeCheckedRest={changeCheckedRest} />}
      <View style={styles.navbar}>
        <NavBar setCurrView={changePage} currPage={currPage} checkedRest={checkedRest} />
      </View>
    </SafeAreaView>
  );
  } else {
    return (
      <SafeAreaView style={styles.container}>
         <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  header: {
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  label: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: windowWidth / 16,
    marginBottom: 10,

  },
  settingsIcon: {
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
    overflow: "hidden"
  },
  closeButtonContainer : { 
    ...StyleSheet.absoluteFillObject,
    top: 15,
    left: 310
  },
  titleWrap : {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  options : {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  
  },
  spacing: {
    marginHorizontal: 10
  }
});
