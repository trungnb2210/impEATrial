import React, {useEffect, useState} from 'react'
import {Text, StyleSheet, View, FlatList, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal';
import {AntDesign, Entypo, MaterialCommunityIcons, Feather, Fontisto, Ionicons} from 'react-native-vector-icons'
import FriendItem from '../components/friends/friendItem'
import matchFriends from '../../backend/friendmatchalgo';

const prefTags = require('../../backend/json/preferencestags.json')

export default function Friends(props) {
  let checked = props.checked
  let tags = prefTags.filter((tag) => tag.id <= checked.length && checked[tag.id -1]).map((tag) => tag.name.toLowerCase())

  const DATA = matchFriends(tags, props.veg, props.vegan, props.gluten)
  // console.log(DATA)

  const photos = ([
    require('../assets/malhar.png'),
    require('../assets/malhar.png'),
    require('../assets/justin.png'),
    require('../assets/aboud.png'),
    require('../assets/tao.png'),
    require('../assets/darius.png'),
    require('../assets/chunyiu.png'),
    require('../assets/jack.png'),
    require('../assets/anson.png'),
    require('../assets/josh.png')
  ]);

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [phone, setPhone] = useState(0);
  const [insta, setInsta] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [id, setId] = useState("");

  const toggleModal = () => {
    setVisible(!visible);
  };

  const getData = (gen, prn, pho, ins, cou, yea, i,name) => {
    setGender(gen);
    setPronoun(prn);
    setPhone(pho);
    setInsta(ins);
    setCourse(cou);
    setYear(yea);
    setId(i); 
    setName(name);
  };
  const renderItem = ({item}) => {
    return (
    <FriendItem
        id = {item.id}
        name = {item.name}
        vegan = {item.vegan}
        veg = {item.vegetarian}
        gluten = {item.gluten}
        price = {item.price}
        first = {item.first}
        second = {item.second}
        third = {item.third}
        toggleModal = {toggleModal}
        getData = {getData}
        gender = {item.gender}
        pronoun = {item.pronouns}
        phone = {item.phone}
        insta = {item.insta}
        course = {item.course}
        year = {item.year}
       />
    )
  };
 
  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>
          Eat with a Friend!
      </Text>
      <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.fl}
        />
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
            <Feather name="x" size={20} style={styles.settingsIcon} />
          </TouchableOpacity>
          <SafeAreaView>
            <Text style = {styles.title}>
                Friend Details
            </Text>
            <View style = {styles.imageframe}> 
              <Image source = {photos[id]} style = {styles.image}/>
            </View>
            <Text style = {styles.title2}>
                {name}
            </Text>
            <View style = {styles.externalcontainer}>
              <View style = {styles.inputcontainer}> 
                <MaterialCommunityIcons name = "gender-transgender" size = {30}/>
                <Text style = {styles.textfield}> {gender} </Text>
              </View>
              <View style = {styles.inputcontainer}> 
                <Fontisto name = "person" size = {30}/>
                  <Text style = {styles.textfield}> {pronoun} </Text>
              </View>
              <View style = {styles.inputcontainer}> 
                <Feather name = "phone" size = {25}/>
                <Text style = {styles.textfield}> {phone} </Text>
              </View>
              <View style = {styles.inputcontainer}> 
                <AntDesign name = "instagram" size = {28}/>
                <Text style = {styles.textfield}> {insta} </Text>
              </View>
              <View style = {styles.inputcontainer}> 
                <Entypo name = "book" size = {28}/>
                <Text style = {styles.textfield}> {course} </Text>
              </View>
              <View style = {styles.inputcontainer}> 
                <Ionicons name = "school" size = {28}/>
                <Text style = {styles.textfield}> {year} </Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "vertical"
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28,
        marginTop: 10,
      },
    title2: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        marginTop: 0,
        marginBottom: 20
      },
    fl: {
      marginTop: 10,
      height: "100%",
      paddingVertical: 0,
      marginBottom: 30,
      paddingHorizontal: 50,
      width: 450,
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
    inputcontainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    }, 
    textfield: {
      height: 40,
      width: 170,
      margin: 12,
      borderWidth: 0,
      padding: 10,
      fontSize: 18
    },
    image: {
      resizeMode : "contain",
      width: 200,
      height: 200,
      borderRadius: 100 
    },
    imageframe: {
      alignItems: "center",
      marginBottom: 0
    }
});