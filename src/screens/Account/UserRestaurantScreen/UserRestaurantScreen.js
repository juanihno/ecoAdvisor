import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../../utils";
import {
  UserNotLogged,
  NotFoundBussiness,
  BussinessFavorites,
} from "../../../components/Favorites";
import { RestaurantRanking } from "../../../components/Restaurants";
import { Loading } from "../../../components/Shared";
import { size, map } from "lodash";
import { UserRestaurants } from "../../../components/Account";
import { useFocusEffect } from "@react-navigation/core";

export function UserRestaurantScreen(props) {
  // const { route } = props;

  const [business, setBusiness] = useState(null);
  const auth = getAuth();
  console.log("businessUSER", business, auth.currentUser.uid);

  // const getRestaurantData = async () => {
  //   setRestaurant(null);
  //   const docRef = doc(db, "restaurants", route.params.id);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     setRestaurant(docSnap.data());
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     getRestaurantData();
  //     // getReviews();
  //   }, [])
  // );
  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      setBusiness(data);
    });
  }, []);
  if (!business) return <Loading show text="Loading..." />;
  if (size(business) === 0)
    return <NotFoundBussiness text="You don't have any restaurant yet..." />;
  return (
    <View>
      {/* <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Mis Restaurantes
      </Text> */}
      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
        {map(business, (bussiness) => (
          <UserRestaurants
            key={bussiness.id}
            bussiness={bussiness}
            style={{ marginHorizontal: 10 }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
