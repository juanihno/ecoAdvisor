import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

import Toast from "react-native-toast-message";
import { Modal } from "../../../components/Shared";
import { styles } from "./MapFormAccount.styles";
export function MapFormAccount(props) {
  const { show, close, locationMap, restaurantId, getRestaurantData } = props;
  //   const [location, setLocation] = useState({
  //     latitude: 0.001,
  //     longitude: 0.001,
  //     latitudeDelta: 0.001,
  //     longitudeDelta: 0.001,
  //   });
  const [location, setLocation] = useState(locationMap);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "button",
          text1: "Go to settings and enable location permission for this app",
        });
        return;
      }
      const locationTemp = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });

      console.log(locationTemp);
    })();
  }, []);
  //   const saveLocation = () => {

  //     // formik.setFieldValue("location", location);
  //     close();
  //   };
  // create update location function to update the location in the database
  const saveLocation = async () => {
    try {
      const docRef = doc(db, "restaurants", restaurantId);
      await updateDoc(docRef, { location });
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Success",

        text2: "Location changed successfully",
      });
      // onReload();
      close();
      getRestaurantData();
    } catch (error) {
      console.log(error.message);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error changing the location",
        text2: error.message,
      });
    }
  };

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        style={styles.mapStyle}
        onRegionChange={(locationTemp) => setLocation(locationTemp)}
      >
        <Marker draggable coordinate={location}></Marker>
      </MapView>
      <View style={styles.mapAction}>
        <Button
          title="Save"
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
          onPress={saveLocation}
        />
        <Button
          title="Close"
          containerStyle={styles.btnMapContainerClose}
          buttonStyle={styles.btnMapClose}
          onPress={close}
        />
      </View>
    </Modal>
  );
}
