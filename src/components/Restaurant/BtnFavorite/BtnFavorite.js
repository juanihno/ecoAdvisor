import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './BtnFavorite.styles';
import { Icon } from 'react-native-elements';
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../utils';
import { size, forEach } from 'lodash';

export function BtnFavorite(props) {
  const { idRestaurant } = props;
  const auth = getAuth();
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getFavorites();
      if (size(response) > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }

      // console.log('Favorite', size(response) > 0 ? true : false);
    })();
  }, [idRestaurant, isReload]);

  const onReload = () => setIsReload((prevState) => !prevState);

  const getFavorites = async () => {
    try {
      const q = query(
        collection(db, 'favorites'),
        where('idRestaurant', '==', idRestaurant),
        where('idUser', '==', auth.currentUser.uid)
      );
      const result = await getDocs(q);
      return result.docs;
    } catch (error) {}
  };

  const addFavorite = async () => {
    try {
      const idFavorite = uuidv4();
      const data = {
        id: idFavorite,
        idRestaurant,
        idUser: auth.currentUser.uid,
      };
      await setDoc(doc(db, 'favorites', idFavorite), data);
      onReload();
      console.log('addFavorite', idFavorite);
    } catch (error) {
      console.log('error', error);
    }
  };
  const removeFavorite = async () => {
    try {
      const response = await getFavorites();
      forEach(response, async (item) => {
        await deleteDoc(doc(db, 'favorites', item.id));
        onReload();
      });
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.content}>
      {isFavorite !== undefined && (
        <Icon
          type="material-community"
          name={isFavorite ? 'heart' : 'heart-outline'}
          color={isFavorite ? '#f00' : '#000'}
          size={35}
          onPress={isFavorite ? removeFavorite : addFavorite}
        />
      )}
    </View>
  );
}
