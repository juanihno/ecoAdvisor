import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './Explore.styles';
import {
  Text,
  Image,
  Input,
  SearchBar,
  Dimensions,
  Rating,
} from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import * as Location from 'expo-location';
import {
  MARGIN,
  CARD_WIDTH,
  CARD_HEIGHT,
  HEIGHT,
  SPACING_FOR_CARD_INSET,
} from '../../../screens/Restaurants/RestaurantsScreen';
import { width } from '../../../screens/Restaurants/RestaurantsScreen';
import { useNavigation, useTheme } from '@react-navigation/native';
import { screen } from '../../../utils';

export function Explore(props) {
  // console.log(
  //   "DIMENSIONS",
  //   MARGIN,
  //   CARD_WIDTH,
  //   CARD_HEIGHT,
  //   HEIGHT,
  //   SPACING_FOR_CARD_INSET
  // );
  // console.log("WIDTH", width);
  const theme = useTheme();

  const { restaurants } = props;
  console.log('RESTAURANTS', restaurants);
  const navigation = useNavigation();

  const markers = restaurants.map((restaurant) => {
    return {
      coordinate: {
        latitude: restaurant.data().location.latitude,
        longitude: restaurant.data().location.longitude,
      },
      name: restaurant.data().name,
      description: restaurant.data().description,
      image: restaurant.data().images[0],
      address: restaurant.data().address,
      id: restaurant.id,
      rating: restaurant.data().averageRating,
    };
  });

  const initialMapState = {
    markers,
    categories: [
      {
        name: 'Fastfood Center',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="food-fork-drink"
            size={18}
          />
        ),
      },
      {
        name: 'Restaurant',
        icon: (
          <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      {
        name: 'Café',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="coffee-outline"
            size={18}
          />
        ),
      },
      {
        name: 'Bar',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="glass-cocktail"
            size={18}
          />
        ),
      },
      {
        name: 'Dessert',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="cupcake"
            size={18}
          />
        ),
      },
    ],
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
  const [state, setState] = initialMapState;
  // console.log("STATE", state.markers);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const goToDetails = (restaurant) => {
    navigation.navigate(screen.restaurant.restaurant, { id: restaurant.id });
  };
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        // customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../../../assets/img/suMLIqqc.png/')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0,
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardImage} key={index}>
              <Image
                // style={{ width: "100%", height: "100%" }}
                style={styles.img}
                //if there is marker.image, use it, otherwise use the default image from the assets
                source={
                  marker.image
                    ? { uri: marker.image }
                    : require('../../../../assets/img/suMLIqqc.png/')
                }
                // source={require("../../../../assets/img/image-not-showing.webp/")}
                resizeMode="cover"
              />
            </View>
            <View style={styles.textContent}>
              <View style={styles.rating}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {marker.name}
                </Text>
                {/* <Rating imageSize={10} readonly startingValue={marker.rating} /> */}
              </View>

              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.address}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.id}
              </Text>

              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => goToDetails(marker)}
                  style={[
                    styles.signIn,
                    {
                      borderColor: '#FF6347',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#FF6347',
                      },
                    ]}
                  >
                    See details{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   searchBox: {
//     position: "absolute",
//     marginTop: Platform.OS === "ios" ? 40 : 20,
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     width: "90%",
//     alignSelf: "center",
//     borderRadius: 5,
//     padding: 10,
//     shadowColor: "#ccc",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   chipsScrollView: {
//     position: "absolute",
//     top: Platform.OS === "ios" ? 90 : 80,
//     paddingHorizontal: 10,
//   },
//   chipsIcon: {
//     marginRight: 5,
//   },
//   chipsItem: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 8,
//     paddingHorizontal: 20,
//     marginHorizontal: 10,
//     height: 35,
//     shadowColor: "#ccc",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   scrollView: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//   },
//   endPadding: {
//     paddingRight: width - CARD_WIDTH,
//   },
//   card: {
//     // padding: 10,
//     flex: 1,
//     elevation: 2,
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: "hidden",
//   },
//   cardImage: {
//     flex: 3,
//     width: "100%",
//     height: "100%",
//     alignSelf: "center",
//   },
//   textContent: {
//     flex: 2,
//     padding: 10,
//   },
//   cardtitle: {
//     fontSize: 12,
//     // marginTop: 5,
//     fontWeight: "bold",
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: "#444",
//   },

//   markerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 50,
//     height: 50,
//   },
//   marker: {
//     width: 30,
//     height: 30,
//   },
//   button: {
//     alignItems: "center",
//     marginTop: 5,
//   },
//   signIn: {
//     width: "100%",
//     padding: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 3,
//   },
//   textSign: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });
