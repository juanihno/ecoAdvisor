import { ScrollView, ImageBackground, View } from "react-native";
import { Text, Button, Image, Icon } from "react-native-elements";
import React from "react";
import { styles } from "./UserGuestScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function UserGuestScreen() {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };
  return (
    <View centerContent={true} style={styles.content}>
      <ImageBackground
        source={require("../../../../assets/img/userNotLogged.png")}
        resizeMode="contain"
        // resizeMethod="scale"
        style={styles.image}
      >
        <View style={styles.view}>
          <Button
            title="Login"
            titleStyle={styles.btnTitle}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={goToLogin}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
