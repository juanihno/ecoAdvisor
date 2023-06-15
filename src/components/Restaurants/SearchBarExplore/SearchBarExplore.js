import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { SearchBar, ListItem, Avatar, Icon, Text } from "react-native-elements";
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { size, map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "../../../components/Shared";
import { db, screen } from "../../../utils";
export function SearchBarExplore(props) {
  const { searchResults, setSearchResults, searchText, setSearchText } = props;
  // const [searchText, setSearchText] = useState("");

  const autoCapitalizeText = (text) => {
    const newText = text
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    setSearchText(newText);
  };

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
      <SearchBar
        containerStyle={{
          // position: "relative",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          backgroundColor: "#fff",
        }}
        inputContainerStyle={{
          backgroundColor: "#fff",
          width: "90%",
          height: 25,
          alignSelf: "center",

          borderWidth: 1,
          borderColor: "#95b53b",
          // backgroundColor: "#95b53b",

          borderBottomWidth: 1,
        }}
        round
        placeholder="Explore sustainability"
        value={searchText}
        //on changetext to lower case and autocapitalize and trim spaces at the end of the string to avoid errors in the search query and to avoid the user having to press the search button to search for the restaurant name in lowercase and without spaces at the end of the string and to avoid the user having to press the search button to search for the restaurant name in lowercase and without spaces at the end of the string
        // onChangeText={(text) => setSearchText(text.toLowerCase().trim())}
        // onChanege test to transform the first letter of each word in uppercase and the rest of the letters in lowercase and to avoid the user having to press the search button to search for the restaurant name in lowercase and without spaces at the end of the string

        onChangeText={(text) => autoCapitalizeText(text)}
      />
      {/* <View style={{ marginEnd: 10, marginTop: 10, alignSelf: "flex-end" }}>
        <Icon
          type="material-community"
          name="air-filter"
          color="#95b53b"
          size="30"
        />
      </View> */}
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
      )}
    </>
  );
}
