import { View } from "react-native";
import React from "react";
import { styles } from "./ChangeName.styles";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeName.data";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils";
import Toast from "react-native-toast-message";
export function ChangeName(props) {
  const { onClose, restaurantId, getRestaurantData } = props;
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { name } = formValue;
        const docRef = doc(db, "restaurants", restaurantId);
        await updateDoc(docRef, { name });

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Success",
          text2: "Name changed successfully",
        });
        // onReload();
        onClose();
        getRestaurantData();
      } catch (error) {
        console.log(error.message);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error changing the name",
          text2: error.message,
        });
      }
    },
  });
  return (
    <View style={styles.comtent}>
      <Input
        placeholder="Name"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "silverware-fork-knife",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        errorMessage={formik.errors.name}
      />
      <Button
        title="Change name"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
