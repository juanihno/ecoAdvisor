import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils';
import { styles } from './UserReviewsScreen.styles';
import React, { useState, useEffect } from 'react';
import { AllUserReviews } from '../../../components/Account';

export function UserReviewsScreen(props) {
  const { route } = props;
  console.log({ route });
  const auth = getAuth();
  const [haslogged, setHasLogged] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  return (
    <SafeAreaView
    // style={styles.content}
    >
      <ScrollView>
        <AllUserReviews userId={auth.currentUser.uid} haslogged={haslogged} />
      </ScrollView>
    </SafeAreaView>
  );
}
