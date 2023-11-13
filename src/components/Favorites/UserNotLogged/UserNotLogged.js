import { ImageBackground, View } from "react-native";
import React from "react";
import { styles } from "./UserNotLogged.styles";
import { Text, Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function UserNotLogged() {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.tab, {
      screen: screen.account.login,
    });
  };
  return (
    <View style={styles.content}>
      {/* <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.info}>
        You need to be logged in to see your favorites restaurants.
      </Text>
      <Button
        title="Go to login"
        onPress={goToLogin}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      /> */}
      <ImageBackground
        source={require("../../../../assets/img/userNotloggedFavUD.png")}
        style={styles.image}
      >
        <View
          style={{
            flex: 1,
            // flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // marginLeft: 20,
            // marginTop: 300,
            position: "absolute",
            bottom: 200,
            // left: 0,
            width: "100%",
          }}
        >
          <Button
            title="Go to login"
            onPress={goToLogin}
            titleStyle={styles.btnTitle}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
