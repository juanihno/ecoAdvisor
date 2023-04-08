import { View } from 'react-native';
import { AirbnbRating, Input, Button } from 'react-native-elements';
import React from 'react';
import { styles } from './AddReviewRestaurantScreen.styles';
import { useFormik } from 'formik';
import {
  initialValues,
  validationSchema,
} from './AddReviewRestaurantScreen.data';
import { Toast } from 'react-native-toast-message';
import { getAuth } from 'firebase/auth';
import { screen } from '../../../utils';
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../utils';
import { v4 as uuid } from 'uuid';
import { map, mean } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { updateRestaurant } from '../../../utils/generalUtilities';
export function AddReviewRestaurantScreen(props) {
  const { route } = props;
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuid();
        const newData = formValue;
        newData.id = idDoc;
        newData.userName = auth.currentUser.displayName;
        newData.idRestaurant = route.params.idRestaurant;
        newData.restaurantName = route.params.restaurantName;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();
        await setDoc(doc(db, 'reviews', idDoc), newData);
        await updateRestaurant(route.params.idRestaurant);
        navigation.navigate(screen.restaurant.restaurant, {
          id: route.params.idRestaurant,
        });
        console.log('Document successfully written!', newData);
      } catch (error) {
        Toast.show({
          type: 'error',
          postion: 'bottom',
          text1: 'Error sending the review',
        });
      }
    },
  });
  // console.log("rating", formik.values.rating);
  // console.log("title", formik.values.title);

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue('rating', rating)}
          />
        </View>
        <Input
          placeholder="Title"
          inputContainerStyle={styles.input}
          onChangeText={(text) => formik.setFieldValue('title', text)}
          errorMessage={formik.errors.title}
        />
        <Input
          placeholder="Write your comment here..."
          multiline
          inputContainerStyle={styles.comment}
          containerStyle={styles.inputContainer}
          onChangeText={(text) => formik.setFieldValue('comment', text)}
          errorMessage={formik.errors.comment}
        />
      </View>
      <Button
        title="Send review"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
