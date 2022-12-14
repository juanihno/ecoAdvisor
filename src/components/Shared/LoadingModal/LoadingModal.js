import { View, ActivityIndicator } from "react-native";
import { Overlay, Text } from "react-native-elements";
import React from "react";
import { styles } from "./LoadingModal.Styles";

export function LoadingModal(props) {
  const { show, text } = props;
  return (
    <Overlay
      isVisible={show}
      windowBackGroundColor="rgba(0,0,0,0,5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.View}>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}
LoadingModal.defaultProps = {
  show: false,
};
