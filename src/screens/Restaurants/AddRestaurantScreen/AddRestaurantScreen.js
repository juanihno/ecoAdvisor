import { ScrollView } from "react-native";
import React from "react";
import { styles } from "./AddRestaurantScreen.styles";
import {
  InfoForm,
  UploadImagesForm,
  ImageRestaurant,
} from "../../../components/Restaurants/AddRestaurant";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRestaurantScreen.data";
import { screen } from "../../../utils";
import { auth, getAuth, onAuthStateChanged } from "firebase/auth";

export function AddRestaurantScreen(props) {
  // const auth = getAuth();
  // const userId = auth.currentUser.uid;

  const { navigation } = props;
  const goToEcoForm = () => {
    navigation.navigate(screen.add.businessTypeForm, {
      ownerFormValue: formik.values,
      console: console.log("addRestaurantScreen values: ", formik.values),
    });
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      goToEcoForm();
      // console.log("formik handlesubmit", formValue);
    },
  });

  // navigation.navigate(screen.ecoForm, { formValue: formik.values });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />
      <InfoForm formik={formik} />
      <UploadImagesForm formik={formik} />
      {/* <Button
        title="Add bussiness"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      /> */}
      <Button
        title="Next"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
      />
    </ScrollView>
  );
}
