import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./InfoForm.styles";
import { Input, Text } from "react-native-elements";
import { MapForm } from "../MapForm";
import { Switch } from "react-native-switch";

export function InfoForm(props) {
  const { formik, userId } = props;
  const [showMap, setShowMap] = useState(false);
  const onOpenCloseMap = () => {
    setShowMap((prevState) => !prevState);
  };
  const getColorIconMap = (formik) => {
    if (formik.errors.location) return "#ff0000";

    if (formik.values.location) return "#00a680";

    return "#c2c2c2";
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    formik.setFieldValue("owner", !isEnabled);
    // formik.setFieldValue("userId", userId);
    // console.log("changed", userId);
  };
  // checkOwner = () => {
  //   //if isEnabled is true, set userId to formik(not implemented yet)
  //   if (isEnabled === true) {
  //     formik.setFieldValue("userId", userId);
  //     console.log("changed", userId);
  //   } else {
  //     formik.setFieldValue("userId", "");
  //   }
  // };

  return (
    <>
      <View style={styles.content}>
        <View style={styles.switch}>
          <Text style={styles.text}>Are you the owner</Text>
          <Switch
            value={isEnabled}
            onValueChange={() => toggleSwitch()}
            disabled={false}
            activeText={"yes"}
            inActiveText={"no"}
            backgroundInactive={"#ff0000"}
            backgroundActive={"#00a680"}
            circleInActiveColor={"#FFFFFF"}
            circleActiveColor={"#FFFFFF"}
          />
        </View>
        <Input
          placeholder="Business name"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Business address"
          onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
          rightIcon={{
            type: "material-community",
            name: "map-marker-radius",
            color: getColorIconMap(formik),
            onPress: onOpenCloseMap,
          }}
        />
        <Input
          placeholder="Business phone, (optional)"
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="Business email (optional)"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Business description"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />
      </View>
      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
}
