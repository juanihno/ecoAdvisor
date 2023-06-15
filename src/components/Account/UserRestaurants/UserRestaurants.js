import { View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Image, Icon, Text, Rating } from "react-native-elements";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { doc, deleteDoc } from "firebase/firestore";
import { styles } from "./UserRestaurants.styles";
export function UserRestaurants(props) {
  const { bussiness } = props;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const goToBussiness = () => {
    navigation.navigate(screen.account.tab, {
      screen: screen.account.editRestaurant,
      params: { id: bussiness.id, images: bussiness.images },
    });
  };
  console.log("bussinessTYpe", bussiness.BusinessType);

  const icons =
    bussiness.BusinessType === "Restaurant"
      ? [
          {
            id: 1,
            value: bussiness.coffee.DiscountForUsingOwncup ? "true" : "false",

            img: require("../../../../assets/img/discount-cup.png"),
          },
          {
            id: 2,
            value: bussiness.menu.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/fully-vegan.png"),
          },
          {
            id: 3,
            value: bussiness.menu.FullyVegetarian ? "true" : "false",
            img: require("../../../../assets/img/fully-vegetarian.png"),
          },
          {
            id: 4,
            value: !bussiness.menu.LocalFood ? "true" : "false",
            img: require("../../../../assets/img/local-food.png"),
          },
          {
            id: 5,
            value: !bussiness.waste.FullyPlasticFree ? "true" : "false",
            img: require("../../../../assets/img/no-plastic.png"),
          },
          {
            id: 6,
            value: bussiness.supplier.ReusableEnergy ? "true" : "false",
            img: require("../../../../assets/img/renewable-energy.png"),
          },
        ]
      : [
          {
            id: 1,
            value: bussiness.FoodProducts.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/fully-vegan.png"),
          },
          {
            id: 2,
            value: bussiness.FoodProducts.FullyVegetarian ? "true" : "false",
            img: require("../../../../assets/img/fully-vegetarian.png"),
          },
          {
            id: 3,
            value: bussiness.FoodProducts.LocalFood ? "true" : "false",
            img: require("../../../../assets/img/local-food.png"),
          },
          {
            id: 4,
            value: bussiness.waste.FullyPlasticFree ? "true" : "false",
            img: require("../../../../assets/img/no-plastic.png"),
          },
          {
            id: 5,
            value: bussiness.SupplierEnergy.ReusableEnergy ? "true" : "false",
            img: require("../../../../assets/img/renewable-energy.png"),
          },
        ];

  return (
    <TouchableOpacity onPress={goToBussiness}>
      <View style={styles.content}>
        <Image
          source={{ uri: bussiness.images[0] }}
          style={{
            // width: width - 30,
            width: width,
            height: height / 3,
            // borderRadius: 25,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: -25,
            left: 15,
            right: 15,
            justifyContent: "space-between",
            // alignItems: "center",
            backgroundColor: "#fff",
            width: width - 60,
            height: height / 5,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 15,
          }}
        >
          <View style={styles.info}>
            <Rating
              imageSize={15}
              startingValue={bussiness.rating}
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingBottom: 10,
              }}
            />

            <Text style={styles.name}>{bussiness.name}</Text>
            <Text style={styles.address}>{bussiness.address}</Text>

            <View style={styles.imgContainer}>
              {icons.map((item, index) => {
                if (item.value == "true") {
                  return (
                    <Image
                      key={index}
                      style={styles.images}
                      source={item.img}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
