import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { Icon, Text } from "react-native-elements";
import { styles } from "./RestaurantsScreen.styles";
import { screen, db } from "../../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  startAt,
  endAt,
  limit,
} from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { Explore } from "../../../components/Restaurants/Explore";
import { SearchBarExplore } from "../../../components/Restaurants/SearchBarExplore";
import { FilterRestaurants } from "../../../components/Restaurants/FilterRestaurants";

const ratio = 228 / 250;
export const MARGIN = 5;
export const { width, height } = Dimensions.get("window");
export const CARD_WIDTH = width * 0.6;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
export const HEIGHT = CARD_HEIGHT + MARGIN * 2;
export const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export function RestaurantsScreen(props) {
  // const [ratio, setRatio] = useState(228 / 250);
  // const [MARGIN, setMARGIN] = useState(5);
  // const [width, setWidth] = useState(Dimensions.get("window").width);
  // const [height, setHeight] = useState(Dimensions.get("window").height);
  // const [CARD_WIDTH, setCARD_WIDTH] = useState(width * 0.6);
  // const [CARD_HEIGHT, setCARD_HEIGHT] = useState(CARD_WIDTH * ratio);
  // const [HEIGHT, setHEIGHT] = useState(CARD_HEIGHT + MARGIN * 2);
  // const [SPACING_FOR_CARD_INSET, setSPACING_FOR_CARD_INSET] = useState(
  //   width * 0.1 - 10
  // );
  const [isReload, setIsReload] = useState(false);
  const onReload = () => setIsReload((prevState) => !prevState);
  // function changeRestaurant to change the restaurants state to pass as props to the filter component
  const updateRestaurants = (restaurants) => {
    setRestaurants(restaurants);
  };
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState();
  // console.log("restaurantsMain", restaurants.length);
  // const { width } = Dimensions.get("window");
  const [searchText, setSearchText] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const autoCapitalizeText = (text) => {
    const newText = text
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    setSearchText(newText);
  };
  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      setSearchResults(querySnapshot.docs);
    })();
  }, [searchText]);
  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //   });
  // }, []);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //   });
  // }, []);
  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("createdAt", "desc")
    );
    // const querySnapshot = getDocs(q);
    // const data = querySnapshot.docs.map((doc) => doc.data());
    // setRestaurants(data);

    // onSnapshot(q, (snapshot) => {
    //   setRestaurants(snapshot.docs);
    //   console.log(
    //     "restaurants",
    //     snapshot.docs.map((doc) => doc.data())
    //   );
    // });
    //aqui
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      setRestaurants(data);
      // console.log("restaurantsNUEVOSlenght", restaurants.lenght);
    });
  }, []);
  console.log("restaurantsNUEVOS", restaurants);

  // convert user location to geohash and query the restaurants collection for the restaurants in a radius of 5km from the user location and set the restaurants state to the restaurants returned from the query not implemented yet
  // const getRestaurants = async () => {
  //   const userLocation = await Location.getCurrentPositionAsync();
  //   const { latitude, longitude } = userLocation.coords;
  //   const userGeohash = geohashForLocation([latitude, longitude]);
  //   const q = query(
  //     collection(db, "restaurants"),
  //     where("geohash", ">=", userGeohash.substring(0, 5)),
  //     where("geohash", "<=", userGeohash.substring(0, 5) + "~")
  //   );
  //   const querySnapshot = await getDocs(q);
  //   const data = querySnapshot.docs.map((doc) => doc.data());
  //   setRestaurants(data);
  // };
  // useEffect(() => {
  //   getRestaurants();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const location = await Location.getCurrentPositionAsync({});
  //     const { latitude, longitude } = location.coords;
  //     const geohash = Geohash.encode(latitude, longitude, 8);
  //     const q = query(
  //       collection(db, "restaurants"),
  //       where("geohash", "==", geohash)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     const data = querySnapshot.docs.map((doc) => doc.data());
  //     setRestaurants(data);
  //   })();
  // }, []);

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant);
  };
  console.log("restaurantsMain", restaurants);

  return (
    // check if currentUser is not null and if it is not null then show the icon
    <View style={styles.content}>
      {!restaurants ? (
        <LoadingModal show text="Loading restaurants..." />
      ) : (
        <>
          <SearchBarExplore
            searchResults={searchResults}
            searchText={searchText}
            setSearchResults={setSearchResults}
            setSearchText={setSearchText}
          />
          {/* // <ListRestaurants restaurants={restaurants} /> */}
          {!searchText && (
            <Explore
              restaurants={restaurants}
              width={width}
              height={height}
              CARD_WIDTH={CARD_WIDTH}
              CARD_HEIGHT={CARD_HEIGHT}
              MARGIN={MARGIN}
              SPACING_FOR_CARD_INSET={SPACING_FOR_CARD_INSET}
              HEIGHT={HEIGHT}
            />
          )}
        </>
      )}
      <FilterRestaurants updateRestaurants={updateRestaurants} />

      {/* {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="air-filter"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )} */}
    </View>
  );
}
