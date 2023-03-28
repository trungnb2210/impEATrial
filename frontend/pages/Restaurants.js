import { StyleSheet, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import {Feather} from 'react-native-vector-icons';
import RestaurantView from "../components/RestaurantView";
import Modal from 'react-native-modal';
import RestaurantModal from '../components/restaurantModal/RestaurantModal';
const DATA = require('../../backend/json/restaurants.json')

const windowWidth = Dimensions.get('window').width;

export default function Restaurants() {
  const photos = ( [
    require ("../assets/scr.png"),
    require ("../assets/scr.png"), 
    require ("../assets/h-bar.png"),
    require ("../assets/kimiko.png"),
    require ("../assets/library.png"),
    require ("../assets/eastside.png"),
    require ("../assets/neopizza.png"),
    require ("../assets/loud.png"),
    require ("../assets/roastery.png"),
    require ("../assets/starbuck.png"),
    require ("../assets/colcaf.png"),
  ])
  const renderItem = ({item}) => {
    return (
    <RestaurantView 
    restaurant={item.restaurant} 
    location={item.location}
    openingTimeWeekday={item.openingTimeWeekday}
    closingTimeWeekday={item.closingTimeWeekday}
    openingTimeWeekend={item.openingTimeWeekend}
    closingTimeWeekend={item.closingTimeWeekend}
    building={item.building}
    waitTime={item.waitTime}
    tag1={item.tag1}
    tag2={item.tag2}
    tag3={item.tag3}
    tag4={item.tag4}
    image = {photos[item.id]}
    toggleModal={toggleModal}
    getModalData={getModalData}
    />
    )
  };

  const [visible, setVisible] = useState(false);
  const [restaurant, setRestaurant] = useState();
  const [openingTime, setOpeningTime] = useState();
  const [closingTime, setClosingTime] = useState();
  const [building, setBuilding] = useState();
  const [waitTime, setWaitTime] = useState();
  const [tag1, setTag1] = useState();
  const [tag2, setTag2] = useState();
  const [tag3, setTag3] = useState();
  const [tag4, setTag4] = useState();
  const [image, setImage] = useState();

  const toggleModal = () => {
    setVisible(!visible);
  }

  const getModalData = (r, ot, ct, bld, wt, t1, t2, t3, t4, i) => {
    setRestaurant(r);
    setOpeningTime(ot);
    setClosingTime(ct);
    setBuilding(bld);
    setWaitTime(wt);
    setTag1(t1);
    setTag2(t2);
    setTag3(t3);
    setTag4(t4);
    setImage(i);
  }

  // const getData = (name, openingTime, closingTime, location, waitTime, tag1, tag2, tag3, tag4) => {

  // }

  return (
    <View style={styles.container}>
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.restaurant}
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
              <Feather name="x" size={windowWidth / 15} style={styles.settingsIcon} />
            </TouchableOpacity>
            <RestaurantModal 
              restaurant={restaurant}
              openingTime={openingTime}
              closingTime={closingTime}
              building={building}
              waitTime={waitTime}
              tag1={tag1}
              tag2={tag2}
              tag3={tag3}
              tag4={tag4}
              image={image}
            />
          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "88%"
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
    left: 310,
    zIndex: 1
  },
  settingsIcon: {
    marginBottom: 10,
  }
});