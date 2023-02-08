import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./RestaurantScreen.styles";
import {
  doc,
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Carousel, Loading } from "../../../components/Shared";
const { width, height } = Dimensions.get("window");

export function RestaurantScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
      //   console.log("Current data: ", doc.data());
    });
  }, []);
  if (!restaurant) return <Loading show text="Loading..." />;
  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={restaurant.images} height={250} width={width} />
    </ScrollView>
  );
}
