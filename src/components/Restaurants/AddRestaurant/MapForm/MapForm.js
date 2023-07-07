import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import Toast from "react-native-toast-message";
import { Modal } from "../../../Shared";
import { styles } from "./MapForm.styles";
import { geohashForLocation } from "geofire-common";
export function MapForm(props) {
  const { show, close, formik } = props;
  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [geohash, setGeohash] = useState("");

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
      setGeohash(
        geohashForLocation([
          locationTemp.coords.latitude,
          locationTemp.coords.longitude,
        ])
      );

      console.log("LOCATIONTEMP", locationTemp);
    })();
  }, []);
  const saveLocation = () => {
    formik.setFieldValue("location", location);
    // close();
  };
  const saveGeoHash = () => {
    formik.setFieldValue("geohash", geohash);
    console.log("GEOHASH", geohash);

    // close();
  };
  const addLocationAndGeoHash = () => {
    saveLocation();
    saveGeoHash();
    close();
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
          onPress={addLocationAndGeoHash}
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
