import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./FilterRestaurants.styles";
import { Icon, Button, Switch } from "react-native-elements";
import { Modal } from "../../Shared";
import { async } from "@firebase/util";
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
export function FilterRestaurants(props) {
  const { updateRestaurants } = props;

  //   console.log("setRestaurants", setRestaurants);
  const [filters, setFilters] = useState({
    restaurants: false,
    shops: false,
    vegan: false,
    vegetarian: false,
  });
  const onChangeSwitch = (value, filterName) => {
    setFilters({ ...filters, [filterName]: value });
    // console.log("onChangeSwitch", filters);
  };

  const saveFilters = () => {
    console.log("saveFilters", filters);
    getRestaurants();
    // setFiltersArray(filters);
    onCloseOpenModal();
  };
  // change the state of the switch to false when the modal is closed and the user wants to reload the map with the new filters applied
  const onReload = () => {
    setFilters({
      restaurants: false,
      shops: false,
      vegan: false,
      vegetarian: false,
    });
    setRestaurantsIsEnabled(false);
    setShopsIsEnabled(false);
    setVeganIsEnabled(false);
    setVegetarianIsEnabled(false);
    // onCloseOpenModal();
  };
  //make a call to firebase to get the restaurants that match the filters selected by the user
  const getRestaurants = async () => {
    try {
      const q = query(
        collection(db, "restaurants"),
        // filters.restaurants ? where("BusinessType", "==", "Restaurant") : null,
        // filters.shops ? where("BusinessType", "==", "Shop") : null
        // filters.vegan ? where("vegan", "==", filters.vegan) : null,
        // filters.vegetarian ? where("vegetarian", "==", "Shop") : null
        //   );
        // where("BusinessType", "==", "Restaurant")
        where("BusinessType", "==", "Shop")
        // where("address", "==", "Dddd")
        //   where("vegetarian", "==", filters.vegetarian)
      );
      const result = await getDocs(q);
      const restaurants = [];
      result.forEach((doc) => {
        restaurants.push({ ...doc.data(), id: doc.id });
      });
      updateRestaurants(restaurants);
      console.log("size restaurants", restaurants.length);

      //   const querySnapshot = await getDocs(q);
      //   const restaurants = [];
      //   querySnapshot.forEach((doc) => {
      //     restaurants.push({ ...doc.data(), id: doc.id });
      //   });
      //   //   setRestaurants(restaurants);
      //   console.log("size restaurants", restaurants.length);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [restaurantsIsEnabled, setRestaurantsIsEnabled] = useState(false);
  const toggleSwitchRestaurants = () => {
    setRestaurantsIsEnabled((previousState) => !previousState);
    onChangeSwitch(!restaurantsIsEnabled, "restaurants");
  };
  const [shopsIsEnabled, setShopsIsEnabled] = useState(false);
  const toggleSwitchShops = () => {
    setShopsIsEnabled((previousState) => !previousState);
    onChangeSwitch(!shopsIsEnabled, "shops");
  };
  const [veganIsEnabled, setVeganIsEnabled] = useState(false);
  const toggleSwitchVegan = () => {
    setVeganIsEnabled((previousState) => !previousState);
    onChangeSwitch(!veganIsEnabled, "vegan");
  };
  const [vegetarianIsEnabled, setVegetarianIsEnabled] = useState(false);
  const toggleSwitchVegetarian = () => {
    setVegetarianIsEnabled((previousState) => !previousState);
    onChangeSwitch(!vegetarianIsEnabled, "vegetarian");
  };

  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
  //   const [filtersArray, setFiltersArray] = useState([]);
  console.log("onChangeSwitch", filters);

  return (
    <>
      <Icon
        containerStyle={styles.btnContainer}
        reverse
        type="material-community"
        name="air-filter"
        color="#00a680"
        onPress={onCloseOpenModal}
      />
      <Modal show={showModal} close={onCloseOpenModal}>
        {
          <View style={styles.content}>
            <View style={styles.switch}>
              <Text style={styles.text}>Restaurants</Text>
              <Switch
                value={restaurantsIsEnabled}
                onValueChange={() => toggleSwitchRestaurants()}
                disabled={false}
                activeText={"yes"}
                inActiveText={"no"}
                backgroundInactive={"#ff0000"}
                backgroundActive={"#00a680"}
                circleInActiveColor={"#FFFFFF"}
                circleActiveColor={"#FFFFFF"}
              />
            </View>
            <View style={styles.switch}>
              <Text style={styles.text}>Shops</Text>
              <Switch
                value={shopsIsEnabled}
                onValueChange={() => toggleSwitchShops()}
                disabled={false}
                activeText={"yes"}
                inActiveText={"no"}
                backgroundInactive={"#ff0000"}
                backgroundActive={"#00a680"}
                circleInActiveColor={"#FFFFFF"}
                circleActiveColor={"#FFFFFF"}
              />
            </View>
            <View style={styles.switch}>
              <Text style={styles.text}>Vegan options</Text>
              <Switch
                value={veganIsEnabled}
                onValueChange={() => toggleSwitchVegan()}
                disabled={false}
                activeText={"yes"}
                inActiveText={"no"}
                backgroundInactive={"#ff0000"}
                backgroundActive={"#00a680"}
                circleInActiveColor={"#FFFFFF"}
                circleActiveColor={"#FFFFFF"}
              />
            </View>
            <View style={styles.switch}>
              <Text style={styles.text}>Vegetarian options</Text>
              <Switch
                value={vegetarianIsEnabled}
                onValueChange={() => toggleSwitchVegetarian()}
                disabled={false}
                activeText={"yes"}
                inActiveText={"no"}
                backgroundInactive={"#ff0000"}
                backgroundActive={"#00a680"}
                circleInActiveColor={"#FFFFFF"}
                circleActiveColor={"#FFFFFF"}
              />
            </View>
            <View style={styles.mapAction}>
              <Button
                title="Apply filters"
                containerStyle={styles.btnMapContainerSave}
                buttonStyle={styles.btnMapSave}
                onPress={saveFilters}
                //   onPress={saveLocation}
              />
              <Button
                title="Close"
                containerStyle={styles.btnMapContainerClose}
                buttonStyle={styles.btnMapClose}
                onPress={onReload}
                //   onPress={close}
              />
            </View>
          </View>
        }
      </Modal>
    </>
  );
}
