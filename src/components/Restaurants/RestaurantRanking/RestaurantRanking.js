import { View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { styles } from "./RestaurantRanking.styles";
import { Image, Icon, Text, Rating } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function RestaurantRanking(props) {
  const { restaurant } = props;
  const { route } = props;

  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const goToBussiness = () => {
    // navigation.navigate(screen.restaurant.tab, {
    //   screen: screen.restaurant.restaurant,
    //   params: { id: restaurant.id },
    // });
    navigation.navigate(screen.restaurant.restaurant, {
      id: restaurant.id,
      routeFrom: "favorites",
    });
  };

  return (
    <TouchableOpacity onPress={goToBussiness}>
      <View style={styles.content}>
        <Image
          source={{ uri: restaurant.images[0] }}
          style={{
            width: width / 2,
            height: height / 6,
            borderRadius: 5,
          }}
        />

        <View style={styles.info}>
          <Rating
            imageSize={15}
            startingValue={restaurant.rating}
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingBottom: 10,
            }}
          />

          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.address}>{restaurant.address}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            containerStyle={styles.favorite}
            underlayColor="transparent"
          />
          <Icon
            type="material-community"
            name="map-outline"
            color="#ccc"
            containerStyle={styles.map}
            // onPress={}
            underlayColor="transparent"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
