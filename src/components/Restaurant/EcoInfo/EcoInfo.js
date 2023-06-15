import { View } from "react-native";
import React, { useState } from "react";
import { styles } from "./EcoInfo.styles";
import { Text, ListItem, Icon, Image, Avatar } from "react-native-elements";
export function EcoInfo(props) {
  const { restaurant } = props;
  const [showListInfo, setShowListInfo] = useState(false);
  const icons =
    restaurant.BusinessType === "Restaurant"
      ? [
          {
            id: 1,
            text: "Discount for using own cup",
            value: restaurant.coffee.DiscountForUsingOwncup ? "true" : "false",

            img: require("../../../../assets/img/discount-cup.png"),
          },
          {
            id: 2,
            text: "Fully vegan options",
            value: restaurant.menu.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/fully-vegan.png"),
          },
          {
            id: 3,
            text: "Fully vegetarian options",
            value: restaurant.menu.FullyVegetarian ? "true" : "false",
            img: require("../../../../assets/img/fully-vegetarian.png"),
          },
          {
            id: 4,
            text: "Local food",
            value: restaurant.menu.LocalFood ? "true" : "false",
            img: require("../../../../assets/img/local-food.png"),
          },
          {
            id: 5,
            text: "No plastic",
            value: restaurant.waste.FullyPlasticFree ? "true" : "false",
            img: require("../../../../assets/img/no-plastic.png"),
          },
          {
            id: 6,
            text: "Renewable energy",
            value: restaurant.supplier.ReusableEnergy ? "true" : "false",
            img: require("../../../../assets/img/renewable-energy.png"),
          },
        ]
      : [
          {
            id: 1,
            text: "Fully vegan options",
            value: restaurant.FoodProducts.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/fully-vegan.png"),
          },
          {
            id: 2,
            text: "Fully vegetarian options",
            value: restaurant.FoodProducts.FullyVegetarian ? "true" : "false",
            img: require("../../../../assets/img/fully-vegetarian.png"),
          },
          {
            id: 3,
            text: "Local food",
            value: restaurant.FoodProducts.LocalFood ? "true" : "false",
            img: require("../../../../assets/img/local-food.png"),
          },
          {
            id: 4,
            text: "No plastic",
            value: restaurant.waste.FullyPlasticFree ? "true" : "false",
            img: require("../../../../assets/img/no-plastic.png"),
          },
          {
            id: 5,
            text: "Renewable energy",
            value: restaurant.SupplierEnergy.ReusableEnergy ? "true" : "false",
            img: require("../../../../assets/img/renewable-energy.png"),
          },
        ];

  //create array of icons that are true
  const trueIcons = icons.filter((icon) => icon.value === "true");

  return (
    <View style={styles.content}>
      {/* <View style={styles.titleContainer}> */}
      <View>
        {trueIcons.length > 0 && (
          <ListItem
            // style={styles.listItem}
            bottomDivider
            onPress={() => {
              showListInfo ? setShowListInfo(false) : setShowListInfo(true);
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {"Highlights"}
              </ListItem.Title>
            </ListItem.Content>
            <Icon
              type={"material-community"}
              name={"arrow-down-drop-circle-outline"}
              color={"#00a680"}
              style={styles.icon}
              onPress={() => {
                showListInfo ? setShowListInfo(false) : setShowListInfo(true);
              }}
            />
          </ListItem>
        )}
      </View>

      {icons.map((item, index) => {
        if (item.value == "true") {
          return (
            showListInfo && (
              <ListItem key={index} style={styles.listItem}>
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 15 }}>
                    {item.text}
                  </ListItem.Title>
                </ListItem.Content>
                <Image source={item.img} style={styles.img} />
              </ListItem>
            )
          );
        } else {
          return null;
        }
      })}
    </View>
  );
}
