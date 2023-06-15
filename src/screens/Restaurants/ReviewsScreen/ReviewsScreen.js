import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useState, useCallback } from "react";

import { AllReviews } from "../../../components/Restaurants";
import { styles } from "./ReviewsScreen.styles";
import { useFocusEffect } from "@react-navigation/core";
import {
  doc,
  onSnapshot,
  orderBy,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../utils";
export function ReviewsScreen(props) {
  const { route } = props;
  const reviews = route.params.reviews;
  const [allReviews, setAllReviews] = useState(reviews);
  const idRestaurant = route.params.idRestaurant;
  console.log("ReviewsScreen", idRestaurant);
  const getReviews = async () => {
    try {
      console.log("Get Reviews", idRestaurant);
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", idRestaurant),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => doc.data());
      setAllReviews(docs);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("ReviewsScreen");
      getReviews();
      return () => {
        console.log("ReviewsScreen unmounted");
      };
    }, [])
  );

  return (
    <ScrollView style={styles.content}>
      <AllReviews reviews={allReviews} />
    </ScrollView>
  );
}
