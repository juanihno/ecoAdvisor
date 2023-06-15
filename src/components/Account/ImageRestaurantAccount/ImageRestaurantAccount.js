import { View } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { styles } from "./ImageRestaurantAccount.styles";

export function ImageRestaurantAccount(props) {
  const { image } = props;
  const primaryImage = image;
  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../assets/img/image-not-showing.webp/")
        }
        style={styles.image}
      />
    </View>
  );
}
