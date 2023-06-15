import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import { styles } from "./FavoritesScreen.styles";

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [business, setBusiness] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  console.log("restaURANts", restaurants);
  // console.log("business", size(restaurants));

  const navigation = useNavigation();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, [auth]);

  useEffect(() => {
    if (auth?.currentUser) {
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );
      onSnapshot(q, async (snapshot) => {
        let bussinesArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "restaurants", data.idRestaurant);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
          bussinesArray.push(newData);
        }
        setBusiness(bussinesArray);
      });
    }
  }, [hasLogged]);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("averageRating", "desc"),
      limit(5)
    );
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      setRestaurants(data);
    });
  }, []);

  if (!hasLogged) return <UserNotLogged />;
  if (!business) return <Loading show text="Loading..." />;
  if (size(business) === 0)
    return <NotFoundBussiness text="You don't have any favorites yet..." />;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "center",
      }}
    >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {map(business, (bussiness) => (
          <BussinessFavorites
            key={bussiness.id}
            bussiness={bussiness}
            style={{ marginHorizontal: 10 }}
          />
        ))}
      </ScrollView>
      <View style={styles.content}>
        <Text style={styles.title}>Top 5 Restaurants</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {map(restaurants, (restaurant) => (
          <RestaurantRanking key={restaurant.id} restaurant={restaurant} />
        ))}
      </ScrollView>
      {/* {map(restaurants, (restaurant) => (
        <RestaurantRanking
          key={restaurant.id}
          restaurant={restaurant}
          // navigation={navigation}
        />
      ))} */}
      {/* <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={business}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(bussiness) =>
          map(business, (bussiness) => (
            <BussinessFavorites key={bussiness.id} bussiness={bussiness} />
          ))
        }
      ></FlatList> */}
    </View>
  );
}
