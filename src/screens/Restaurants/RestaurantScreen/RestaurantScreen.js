import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { styles } from './RestaurantScreen.styles';
import {
  doc,
  onSnapshot,
  orderBy,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
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
import { getAuth } from '@firebase/auth';
const { width, height } = Dimensions.get('window');

export function RestaurantScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [userReview, setUserReview] = useState([]);
  const auth = getAuth();

  const getRestaurantData = async () => {
    setRestaurant(null);
    const docRef = doc(db, 'restaurants', route.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRestaurant(docSnap.data());
    }
  };

  const getReviews = async () => {
    try {
      console.log('Get Reviews', route.params.id);
      const q = query(
        collection(db, 'reviews'),
        where('idRestaurant', '==', route.params.id),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => doc.data());
      setAllReviews(docs);
      const userFilterReview = docs.filter(
        (review) => review.idUser === auth.currentUser.uid
      );
      setUserReview(userFilterReview);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRestaurantData();
      getReviews();
    }, [])
  );

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
        userReview={userReview}
      />
      <Reviews idRestaurant={route.params.id} allReviews={allReviews} />
      <BtnFavorite idRestaurant={route.params.id} />
    </ScrollView>
  );
}
