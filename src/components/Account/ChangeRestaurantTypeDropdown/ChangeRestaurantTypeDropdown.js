import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./ChangeRestaurantTypeDropdown.styles";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils";
import Toast from "react-native-toast-message";
export function ChangeRestaurantTypeDropdown(props) {
  const { restaurant, restaurantId } = props;

  const data = [
    { label: "Restaurant", value: "restaurant" },
    { label: "Cofee/Bakery", value: "cofee/Bakery" },
  ];

  const [value, setValue] = useState(""); // Initialize useState with the type is gonna receive (string put '', array put [], object put {}, number put 0)

  console.log("valor restaurante value ", value);

  const handleChange = async (e) => {
    try {
      setValue(e.value);
      const docRef = doc(db, "restaurants", restaurantId);
      await updateDoc(docRef, "RestaurantType", e.value);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Success",
        text2: "Restaurant type changed successfully",
      });
    } catch (error) {
      console.log(error.message);
      console.log(docRef);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error changing the type of restaurant",
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Restaurant type</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={restaurant.RestaurantType}
        searchPlaceholder="Search..."
        value={value}
        onChange={handleChange}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
}
