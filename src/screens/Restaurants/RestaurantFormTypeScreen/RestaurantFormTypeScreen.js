import { ScrollView } from "react-native";
import React, { useEffect } from "react";
import { styles } from "./RestaurantFormTypeScreen.styles";
import {
  RestaurantTypeDropdown,
  RestaurantCheckBox,
} from "../../../components/Restaurants/AddRestaurant";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./RestaurantFormTypeScreen.data";
import { screen } from "../../../utils";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { getAuth } from "firebase/auth";

export function RestaurantFormTypeScreen(props) {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  console.log("USERID", userId);

  const { navigation } = props;
  const ownerFormValue = props.route.params.ownerFormValue;
  // useeffect to check if the ownerFormValue.owner is true

  useEffect(() => {
    if (ownerFormValue.owner === true) {
      formik.setFieldValue("userId", userId);
      console.log("USERIDSET", userId);
    }
  }, []);

  console.log("restaurantFormTypeScreen", ownerFormValue);

  const goToRestaurantScreen = () => {
    navigation.navigate(screen.restaurant.restaurants, {
      console: console.log("pasando valores fromik", formik.values),
    });
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = { ...formValue, ...ownerFormValue };
        newData.id = uuidv4();
        newData.createdAt = new Date();
        console.log("newData", newData);
        //add newData to firebase firestore collection "restaurants"

        await setDoc(doc(db, "restaurants", newData.id), newData);

        goToRestaurantScreen();
      } catch (error) {
        console.log("Error", error);
      }
      // goToRestaurantScreen();
      // goToEcoForm();
      // console.log("formik handlesubmit", formValue);
    },
  });

  // navigation.navigate(screen.ecoForm, { formValue: formik.values });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <RestaurantTypeDropdown formik={formik} />
      <RestaurantCheckBox formik={formik} />

      <Button
        title="Next"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        disabled={formik.values.RestaurantType === ""}
      />
    </ScrollView>
  );
}
