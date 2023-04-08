import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { styles } from './RestaurantScreen.styles';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../../utils';
import {
  Header,
  Info,
  EcoInfo,
  BtnReviewForm,
  Reviews,
  BtnFavorite,
} from '../../../components/Restaurant';
import { Carousel, Loading, Map } from '../../../components/Shared';
import { useFocusEffect } from '@react-navigation/core';
const { width, height } = Dimensions.get('window');

export function RestaurantScreen(props) {
  const { route } = props;
  console.log('route', route);
  const [restaurant, setRestaurant] = useState(null);

  const getRestaurantData = async () => {
    setRestaurant(null);
    const docRef = doc(db, 'restaurants', route.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRestaurant(docSnap.data());
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, [route.params.id]);

  if (!restaurant) return <Loading show text="Loading..." />;
  return (
    <ScrollView style={styles.content}>
      <View
      // style={{
      //   borderRadius: 50,
      //   overflow: "hidden",
      //   // height: height / 3.5,
      //   // width: width / 0.6,
      //   paddingLeft: 5,
      //   paddingRight: 5,
      // }}
      >
        <Carousel
          arrayImages={restaurant.images}
          height={height / 3.5}
          width={width / 0.5}
          // hideDots
        />
      </View>
      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />
      <EcoInfo restaurant={restaurant} />
      <BtnReviewForm
        idRestaurant={route.params.id}
        restaurantName={restaurant.name}
      />
      <Reviews idRestaurant={route.params.id} />
      <BtnFavorite idRestaurant={route.params.id} />
    </ScrollView>
  );
}
