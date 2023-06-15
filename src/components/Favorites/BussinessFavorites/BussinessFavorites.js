import { View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { styles } from "./BussinessFavorites.styles";
import { Image, Icon, Text, Rating } from "react-native-elements";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { doc, deleteDoc } from "firebase/firestore";

export function BussinessFavorites(props) {
  const { bussiness } = props;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const resetRestaurantStackNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            // name: screen.restaurant.tab,
            name: screen.favorites.tab,
            state: {
              routes: [
                {
                  name: screen.restaurant.restaurant,
                },
              ],
            },
          },
        ],
      })
    );
  };
  // const resetRestaurantStackNavigation = () => {
  //   navigation.dispatch(
  //     CommonActions.navigate(screen.restaurant.tab, {
  //       screen: screen.restaurant.restaurant,
  //       params: { id: bussiness.id },
  //     })
  //   );
  // };
  const setParamsRestaurantStackNavigation = () => {
    navigation.dispatch(
      CommonActions.setParams({
        screen: screen.restaurant.restaurant,
        params: { id: bussiness.id },
      })
    );
  };

  const goToBussiness = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: { id: bussiness.id },
    });
  };
  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", bussiness.idFavorite));
      resetRestaurantStackNavigation();
      // setParamsRestaurantStackNavigation();
    } catch (error) {
      console.log(error);
    }
  };
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
            value: bussiness.menu.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/fully-vegetarian.png"),
          },
          {
            id: 4,
            value: !bussiness.menu.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/local-food.png"),
          },
          {
            id: 5,
            value: !bussiness.menu.FullyVegan ? "true" : "false",
            img: require("../../../../assets/img/no-plastic.png"),
          },
          {
            id: 6,
            value: bussiness.menu.FullyVegan ? "true" : "false",
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
            value: bussiness.FoodProducts.FullyPlasticFree ? "true" : "false",
            img: require("../../../../assets/img/no-plastic.png"),
          },
          {
            id: 5,
            value: bussiness.FoodProducts.ReusableEnergy ? "true" : "false",
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
            <Icon
              type="material-community"
              name="heart"
              color="#f00"
              containerStyle={styles.favorite}
              onPress={onRemoveFavorite}
              underlayColor="transparent"
            />
            <Icon
              type="material-community"
              name="map-outline"
              color="#ccc"
              containerStyle={styles.map}
              underlayColor="transparent"
              // onPress={() => {
              //   setfirst(true);
              //   console.log(first);
              // }}
            />

            {/* {bussiness.coffee.DiscountForUsingOwncup ||
            !bussiness.menu.FullyVegan ||
            !bussiness.menu.FullyVegetarian ||
            !bussiness.menu.LocalFood ||
            !bussiness.waste.FullyPlasticFree ||
            bussiness.supplier.ReusableEnergy ? (
              <View style={styles.imgContainer}>
                {listInfo.map((item, index) => (
                  <Image
                    key={index}
                    style={styles.images}
                    source={item.img}
                    resizeMode="contain"
                  />
                ))}
              </View>
            ) : null} */}
            <View style={styles.imgContainer}>
              {/* {icons.forEach((element) => {
                if (element.icon == "check") {
                  <Image
                    style={styles.images}
                    source={require("../../../../assets/img/discount-cup.png")}
                    resizeMode="contain"
                  />;
                }
              })} */}
              {/* {icons.map((item, index) => (
                <Icon key={index} type="material-community" name={item.icon} />
              ))} */}

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
