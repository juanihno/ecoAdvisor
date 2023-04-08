import { View, Text, ScrollView, Dimensions } from 'react-native';
import React from 'react';

import { AllReviews } from '../../../components/Restaurants';
import { styles } from './ReviewsScreen.styles';
export function ReviewsScreen(props) {
  const { route } = props;
  const reviews = route.params.reviews;

  return (
    <ScrollView style={styles.content}>
      <AllReviews reviews={reviews} />
    </ScrollView>
  );
}
