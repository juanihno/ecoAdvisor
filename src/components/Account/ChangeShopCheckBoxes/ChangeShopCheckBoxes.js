import { View } from "react-native";
import { Text, CheckBox, Icon, ListItem } from "react-native-elements";
import React, { useState } from "react";
import { styles } from "./ChangeShopCheckBoxes.styles";
import Data from "./ChangeShopCheckBoxesData.json";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils";

export function ChangeShopCheckBoxes(props) {
  const { restaurant, getRestaurantData } = props;
  console.log("Changerestaurant", restaurant.coffee);
  const [bussiness, setBussiness] = useState(restaurant);
  const [showProducts, setShowProducts] = useState(false);
  const [showWaste, setShowWaste] = useState(false);
  const [showSupplier, setShowSupplier] = useState(false);

  // create handleCheckboxes function to change the value of the restaurant object (coffee, menu, waste, supplier, community) when the checkbox is pressed and update the value of the checkbox in firebase and show the new value of the checkbox in the app (true or false) when the checkbox is pressed (handleCheckboxes function)
  //   const handleCheckboxes = async (restaurantObject, itemValue) => {
  //     try {
  //       const docRef = doc(db, "restaurants", restaurant.id);
  //       await updateDoc(docRef, {
  //         [restaurantObject]: {
  //           [itemValue]: !restaurant[restaurantObject][itemValue],
  //         },
  //       });
  //       getRestaurantData();
  //       //depending on the value of the restaurant object (coffee, menu, waste, supplier, community) setShowCoffee, setShowMenu, setShowWaste, setShowSupplier, setShowCommunity to true or false to show or hide the checkboxes of the restaurant object (coffee, menu, waste, supplier, community) when the checkbox is pressed (handleCheckboxes function)
  //       //   if (restaurantObject === "coffee") {
  //       //     setShowCoffee(!showCoffee);
  //       //   } else if (restaurantObject === "menu") {
  //       //     setShowMenu(!showMenu);
  //       //   } else if (restaurantObject === "waste") {
  //       //     setShowWaste(!showWaste);
  //       //   } else if (restaurantObject === "supplier") {
  //       //     setShowSupplier(!showSupplier);
  //       //   } else if (restaurantObject === "community") {
  //       //     setShowCommunity(!showCommunity);
  //       //   }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const handleCheckboxes = async (restaurantObject, itemValue) => {
  //     console.log("restaurantObject", restaurantObject);
  //     console.log("itemValue", itemValue);
  //     const restaurantRef = doc(db, "restaurants", restaurant.id);
  //     const docSnap = await getDoc(restaurantRef);
  //     if (docSnap.exists()) {
  //       const restaurantData = docSnap.data();
  //       console.log("restaurantData", restaurantData);
  //       restaurantData[restaurantObject][itemValue] =
  //         !restaurantData[restaurantObject][itemValue];
  //       console.log("restaurantData", restaurantData);
  //       await updateDoc(
  //         restaurantRef,
  //         restaurantObject,
  //         restaurantData[restaurantObject]
  //       );
  //       //   restaurant.coffee[item.value] = !restaurant.coffee[item.value];

  //       //   getRestaurantData();
  //     }
  //   };

  // create function to update value of the selected checkbox in the array bussiness (coffee, menu, waste, supplier, community)   when the checkbox is pressed (handleCheckboxes function) and then update it in firebase and show the new value of the checkbox in the app (true or false) when the checkbox is pressed (handleCheckboxes function) and then update it in firebase and show the new value of the checkbox in the app (true or false) when the checkbox is pressed (handleCheckboxes function)

  const handleCheckboxes = (restaurantObject, itemValue) => {
    console.log("restaurantObject", restaurantObject);
    console.log("itemValue", itemValue);
    const bussinessCopy = { ...bussiness };
    bussinessCopy[restaurantObject][itemValue] =
      !bussinessCopy[restaurantObject][itemValue];
    setBussiness(bussinessCopy);
    console.log("bussinessCopy", bussinessCopy);
    const restaurantRef = doc(db, "restaurants", bussiness.id);
    updateDoc(restaurantRef, bussinessCopy);
    // getRestaurantData();
  };

  return (
    <View style={styles.content}>
      <ListItem
        bottomDivider
        onPress={() => {
          showProducts ? setShowProducts(false) : setShowProducts(true);
        }}
      >
        <Icon
          type={"material-community"}
          name={"food-variant"}
          color={"#00a680"}
        />
        <ListItem.Content>
          <ListItem.Title>{"Food/Products"}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type={"material-community"}
          name={"arrow-down-drop-circle-outline"}
          color={"#00a680"}
          onPress={() => {
            showProducts ? setShowProducts(false) : setShowProducts(true);
          }}
        />
      </ListItem>
      {showProducts ? (
        <View>
          {Data.FoodProducts.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={bussiness.FoodProducts[item.value]}
                checkedColor={"#00a680"}
                onPress={() => handleCheckboxes("FoodProducts", item.value)}
                key={`FoodProducts-${item.id}`}
              />
            );
          })}
          <View style={styles.closeIconContainer}>
            <Icon
              type={"material-community"}
              name={"arrow-up-drop-circle-outline"}
              color={"#00a680"}
              onPress={() => {
                showProducts ? setShowProducts(false) : setShowProducts(true);
              }}
            />
          </View>
        </View>
      ) : null}
      <ListItem
        bottomDivider
        onPress={() => {
          showSupplier ? setShowSupplier(false) : setShowSupplier(true);
        }}
      >
        <Icon
          type={"material-community"}
          name={"lightbulb-on-outline"}
          color={"#00a680"}
        />
        <ListItem.Content>
          <ListItem.Title>{"Supplier and energy"}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type={"material-community"}
          name={"arrow-down-drop-circle-outline"}
          color={"#00a680"}
          onPress={() => {
            showSupplier ? setShowSupplier(false) : setShowSupplier(true);
          }}
        />
      </ListItem>
      {showSupplier ? (
        <View>
          {Data.SupplierEnergy.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={bussiness.SupplierEnergy[item.value]}
                checkedColor={"#00a680"}
                onPress={() => handleCheckboxes("SupplierEnergy", item.value)}
                key={`SupplierEnergy-${item.id}`}
              />
            );
          })}
          <View style={styles.closeIconContainer}>
            <Icon
              type={"material-community"}
              name={"arrow-up-drop-circle-outline"}
              color={"#00a680"}
              onPress={() => {
                showSupplier ? setShowSupplier(false) : setShowSupplier(true);
              }}
            />
          </View>
        </View>
      ) : null}
      <ListItem
        bottomDivider
        onPress={() => {
          showWaste ? setShowWaste(false) : setShowWaste(true);
        }}
      >
        <Icon
          type={"material-community"}
          name={"delete-empty-outline"}
          color={"#00a680"}
        />
        <ListItem.Content>
          <ListItem.Title>{"Waste"}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type={"material-community"}
          name={"arrow-down-drop-circle-outline"}
          color={"#00a680"}
          onPress={() => {
            showWaste ? setShowWaste(false) : setShowWaste(true);
          }}
        />
      </ListItem>
      {showWaste ? (
        <View>
          {Data.waste.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={bussiness.waste[item.value]}
                checkedColor={"#00a680"}
                onPress={() => handleCheckboxes("waste", item.value)}
                key={`waste-${item.id}`}
              />
            );
          })}
          <View style={styles.closeIconContainer}>
            <Icon
              type={"material-community"}
              name={"arrow-up-drop-circle-outline"}
              color={"#00a680"}
              onPress={() => {
                showWaste ? setShowWaste(false) : setShowWaste(true);
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
