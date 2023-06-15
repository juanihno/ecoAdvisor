import { View } from "react-native";
import React from "react";
import { styles } from "./ChangePhone.styles";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangePhone.data";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils";
import Toast from "react-native-toast-message";
export function ChangePhone(props) {
  const { onClose, restaurantId, getRestaurantData } = props;
  console.log("ChangePhone", restaurantId);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { phone } = formValue;
        const docRef = doc(db, "restaurants", restaurantId);
        await updateDoc(docRef, "phone", phone);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Success",
          text2: "Phone changed successfully",
        });
        onClose();
        getRestaurantData();
      } catch (error) {
        console.log(error.message);
        console.log(docRef);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error changing the phone",
          text2: error.message,
        });
      }
    },
  });
  return (
    <View style={styles.comtent}>
      <Input
        placeholder="Phone"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "phone",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("phone", text)}
        errorMessage={formik.errors.phone}
      />
      <Button
        title="Change phone"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
