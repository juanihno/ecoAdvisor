import { ScrollView, ImageBackground, View } from "react-native";
import { Text, Button, Image, Icon } from "react-native-elements";
import React from "react";
import { styles } from "./addRestaurantHomeScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function AddRestaurantHomeScreen() {
  const navigation = useNavigation();
  const goToAdd = () => {
    navigation.navigate(screen.add.add);
  };
  return (
    <View centerContent={true} style={styles.content}>
      <ImageBackground
        source={require("../../../../assets/img/addHome.png")}
        style={styles.image}
      >
        <View style={styles.view}>
          <Button
            title="Add"
            type="outline"
            titleStyle={styles.btnTitle}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={goToAdd}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
