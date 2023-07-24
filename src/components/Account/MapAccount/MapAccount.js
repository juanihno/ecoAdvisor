import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./MapAccount.styles";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";
import { MapFormAccount } from "../../../components/Shared";

export function MapAccount(props) {
  const { location, name, onOpenCloseMap, show } = props;
  console.log("location", props);

  //   const [showMap, setShowMap] = useState(false);
  //   const onOpenCloseMap = () => {
  //     setShowMap((prevState) => !prevState);
  //   };
  const openAppMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
    });
  };
  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={location}
        //   showsUserLocation={false}
        //   showsMyLocationButton={false}
        //   showsCompass={false}
        // zoomEnabled={false}
        scrollEnabled={false}
        onPress={onOpenCloseMap}
      >
        <Marker coordinate={location} title={name} />
      </MapView>

      {/* <MapFormAccount show={showMap} close={onOpenCloseMap} /> */}
    </>
  );
}
