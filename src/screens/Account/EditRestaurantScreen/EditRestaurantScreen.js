import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { styles } from "./EditRestaurantScreen.styles";
import { LoadingModal } from "../../../components/Shared";
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
import { Header, Info, EcoInfo } from "../../../components/Restaurant";
import { Carousel, Loading, Map } from "../../../components/Shared";
import { useFocusEffect } from "@react-navigation/core";
import { getAuth } from "@firebase/auth";
import {
  HeaderAccount,
  ImageRestaurantAccount,
  InfoAccount,
} from "../../../components/Account";
import { UploadImagesFormAccount } from "../../../components/Account/UploadImagesFormAccount";
import { ChangeRestaurantCheckBoxes } from "../../../components/Account/ChangeRestaurantCheckBoxes/ChangeRestaurantCheckBoxes";
import { ChangeShopCheckBoxes } from "../../../components/Account/ChangeShopCheckBoxes";
import { ChangeRestaurantTypeDropdown } from "../../../components/Account/ChangeRestaurantTypeDropdown/ChangeRestaurantTypeDropdown";
import { ChangeShopTypeDropdown } from "../../../components/Account/ChangeShopTypeDropdown";
import { Button } from "react-native-elements";
// import { RestaurantCheckBox } from "../../../components/Restaurants/AddRestaurant/RestaurantCheckBox/RestaurantCheckBox";
const { width, height } = Dimensions.get("window");

export function EditRestaurantScreen(props) {
  const { route } = props;
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("false");
  const [_, setReload] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);
  const [restaurant, setRestaurant] = useState(null);

  // create const array images with all images from restaurant

  const auth = getAuth();

  const getRestaurantData = async () => {
    setRestaurant(null);
    const docRef = doc(db, "restaurants", route.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRestaurant(docSnap.data());
    }
  };
  const DeleteBussiness = async () => {
    setLoading(true);
    setLoadingText("Deleting bussiness");
    const docRef = doc(db, "restaurants", route.params.id);
    await deleteDoc(docRef);
    setLoading(false);
    props.navigation.navigate("Account");
  };

  useFocusEffect(
    useCallback(() => {
      getRestaurantData();
      // getReviews();
    }, [])
  );
  console.log("restaurantEDIT", restaurant);
  if (!restaurant) return <Loading show text="Loading..." />;
  return (
    <ScrollView style={styles.content}>
      {/* <ImageRestaurantAccount image={restaurant.images[0]} /> */}

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
      <HeaderAccount restaurant={restaurant} />
      <UploadImagesFormAccount
        restaurantId={restaurant.id}
        images={restaurant.images}
        getRestaurantData={getRestaurantData}
      />

      <InfoAccount
        restaurant={restaurant}
        getRestaurantData={getRestaurantData}
      />
      {restaurant.BusinessType === "Restaurant" ? (
        <ChangeRestaurantTypeDropdown
          restaurant={restaurant}
          // getRestaurantData={getRestaurantData}
          restaurantId={restaurant.id}
        />
      ) : (
        <ChangeShopTypeDropdown
          restaurant={restaurant}
          restaurantId={restaurant.id}
        />
      )}

      {restaurant.BusinessType === "Restaurant" ? (
        <ChangeRestaurantCheckBoxes
          restaurant={restaurant}
          getRestaurantData={getRestaurantData}
        />
      ) : (
        <ChangeShopCheckBoxes restaurant={restaurant} />
      )}

      {/* <RestaurantCheckBox restaurant={restaurant} /> */}
      <LoadingModal show={loading} text={loadingText} />
      <>
        <Button
          title="Delete bussines"
          containerStyle={styles.btnMapContainerClose}
          style={styles.btnMapClose}
          onPress={DeleteBussiness}
        />
      </>

      {/* <EcoInfo restaurant={restaurant} /> */}
    </ScrollView>
  );
}
