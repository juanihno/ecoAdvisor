import { View } from "react-native";
import { Text, Rating, Image } from "react-native-elements";
import React from "react";
import { styles } from "./Header.styles";

export function Header(props) {
  const { restaurant } = props;

  const icons =
    restaurant.BusinessType === "Restaurant"
      ? [
          {
            id: 1,
            value: restaurant.coffee.DiscountForUsingOwncup ? "true" : "false",
            img: require("../../../../assets/img/discount-cup.png"),
          },
          {
            id: 2,
            value: restaurant.menu.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/fully-vegan.png"),
          },
          {
            id: 3,
            value: restaurant.menu.FullyVegetarian ? "true" : "false",
            img: require("../../../../assets/img/fully-vegetarian.png"),
          },
          {
            id: 4,
            value: restaurant.menu.LocalFood ? "true" : "false",
            img: require("../../../../assets/img/local-food.png"),
          },
          {
            id: 5,
            value: restaurant.waste.FullyPlasticFree ? "true" : "false",
            img: require("../../../../assets/img/no-plastic.png"),
          },
          {
            id: 6,
            value: restaurant.supplier.ReusableEnergy ? "true" : "false",
            img: require("../../../../assets/img/renewable-energy.png"),
          },
        ]
      : [
          {
            id: 1,
            value: restaurant.FoodProducts.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/fully-vegan.png"),
          },
          {
            id: 2,
            value: restaurant.FoodProducts.FullyVegetarian ? "true" : "false",
            img: require("../../../../assets/img/fully-vegetarian.png"),
          },
          {
            id: 3,
            value: restaurant.FoodProducts.LocalFood ? "true" : "false",
            img: require("../../../../assets/img/local-food.png"),
          },
          {
            id: 4,
            value: restaurant.waste.FullyPlasticFree ? "true" : "false",
            img: require("../../../../assets/img/no-plastic.png"),
          },
          {
            id: 5,
            value: restaurant.SupplierEnergy.ReusableEnergy ? "true" : "false",
            img: require("../../../../assets/img/renewable-energy.png"),
          },
        ];

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating
          imageSize={20}
          startingValue={restaurant.averageRating | 0}
          readonly
        />
      </View>

      <View style={styles.imgContainer}>
        {icons.map((item, index) => {
          if (item.value == "true") {
            return <Image key={index} style={styles.img} source={item.img} />;
          } else {
            return null;
          }
        })}
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
