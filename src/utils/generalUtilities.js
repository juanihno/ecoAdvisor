import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import { mean } from 'lodash';

export const updateRestaurant = async (idRestaurant) => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('idRestaurant', '==', idRestaurant)
    );
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map((doc) => doc.data());
    const arrayStars = reviews.map((review) => review.rating);
    const averageRating = mean(arrayStars);
    const restaurantRef = doc(db, 'restaurants', idRestaurant);
    await updateDoc(restaurantRef, {
      averageRating: averageRating,
    });
  } catch (error) {
    console.log(error);
  }
};
