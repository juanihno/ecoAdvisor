import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { styles } from "./BusinessTypeScreen.styles";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { screen } from "../../../utils";

export function BusinessTypeScreen(props) {
  const dataBusinessType = [
    { label: "Restaurant", value: "restaurant" },
    { label: "Shop", value: "shop" },
  ];

  const [value, setValue] = useState("");
  //console.log({ value });
  const { navigation } = props;
  const ownerFormValue = props.route.params.ownerFormValue;
  console.log({ ownerFormValue });
  const goToRestaurantFormTypeScreen = () => {
    navigation.navigate(screen.restaurant.restaurantTypeForm, {
      ownerFormValue: ownerFormValue,
      // console: console.log("pasando valores fromik", formik.values),
    });
  };
  const goToShopFormTypeScreen = () => {
    navigation.navigate(screen.restaurant.shopTypeForm, {
      ownerFormValue: ownerFormValue,

      // console: console.log("pasando valores fromik", formik.values),
    });
  };
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Select the business type?</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataBusinessType}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select business type"
        searchPlaceholder="Search..."
        value={value}
        onChange={(text) => {
          setValue(text.value);
          // console.log("a ver ", value);
          // console.log("a ver formik ", formik.values.businessType);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      />
      {value === "restaurant" ? (
        <Button
          title="Go to restaurant form"
          buttonStyle={styles.addRestaurant}
          onPress={goToRestaurantFormTypeScreen}
        />
      ) : value === "shop" ? (
        <Button
          title="Go to shop form"
          buttonStyle={styles.addRestaurant}
          onPress={goToShopFormTypeScreen}
        />
      ) : null}
    </View>
  );
}
