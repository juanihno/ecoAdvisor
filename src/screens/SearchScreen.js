import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SearchBar, ListItem, Avatar, Icon, Text } from 'react-native-elements';
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MapView from 'react-native-maps';

import { size, map } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../components/Shared';
import { db, screen } from '../utils';
import { SearchBarExplore } from '../components/Restaurants/SearchBarExplore';
import { Explore } from '../components/Restaurants/Explore';
export function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [transformedText, setTransformedText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const autoCapitalizeText = (text) => {
    const newText = text
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
    setSearchText(newText);
  };
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, 'restaurants'),
      orderBy('createdAt', 'desc')
    );
    // onSnapshot(q, (snapshot) => {
    //   setRestaurants(snapshot.docs);
    //   console.log(
    //     "restaurants",
    //     snapshot.docs.map((doc) => doc.data())
    //   );
    // });
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      setRestaurants(data);
      // console.log("restaurantsNUEVOS", data);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, 'restaurants'),
        orderBy('name'),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      setSearchResults(querySnapshot.docs);
    })();
  }, [searchText]);
  const navigation = useNavigation();

  const goToRestaurant = (idRestaurant) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: idRestaurant,
      },
    });
  };

  return (
    <>
      {/* <SearchBar
        placeholder="Search"
        value={searchText}
        //on changetext to lower case and autocapitalize and trim spaces at the end of the string to avoid errors in the search query and to avoid the user having to press the search button to search for the restaurant name in lowercase and without spaces at the end of the string and to avoid the user having to press the search button to search for the restaurant name in lowercase and without spaces at the end of the string
        // onChangeText={(text) => setSearchText(text.toLowerCase().trim())}
        // onChanege test to transform the first letter of each word in uppercase and the rest of the letters in lowercase and to avoid the user having to press the search button to search for the restaurant name in lowercase and without spaces at the end of the string

        onChangeText={(text) => autoCapitalizeText(text)}
      />

      {!searchResults && <Loading show text="Cargando" />}
      {searchText && (
        <ScrollView>
          {size(searchResults) === 0 ? (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text>Sorry no results found</Text>
            </View>
          ) : (
            map(searchResults, (item) => {
              const data = item.data();

              return (
                <ListItem
                  key={data.id}
                  bottomDivider
                  onPress={() => goToRestaurant(data.id)}
                >
                  <Avatar source={{ uri: data.images[0] }} rounded />
                  <ListItem.Content>
                    <ListItem.Title>{data.name}</ListItem.Title>
                  </ListItem.Content>
                  <Icon type="material-community" name="chevron-right" />
                </ListItem>
              );
            })
          )}
        </ScrollView>
      )} */}
      <SearchBarExplore
        searchResults={searchResults}
        searchText={searchText}
        setSearchResults={setSearchResults}
        setSearchText={setSearchText}
      />
      {!searchText && <MapView style={{ flex: 1 }} />}

      {/* <Explore restaurants={restaurants} /> */}
    </>
  );
}
