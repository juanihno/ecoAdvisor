import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { styles } from "./Explore.styles";
import {
  Text,
  Image,
  Input,
  SearchBar,
  Dimensions,
  Rating,
} from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

import * as Location from "expo-location";

import { useNavigation, useTheme } from "@react-navigation/native";
import { screen } from "../../../utils";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
// import { SearchBarExplore } from "../SearchBarExplore";
import { isDeviceWidth375_667 } from "../../../utils";

export function Explore(props) {
  const {
    restaurants,
    location,
    CARD_HEIGHT,
    CARD_WIDTH,
    MARGIN,
    SPACING_FOR_CARD_INSET,
    HEIGHT,
    height,
    width,
    updateRestaurants,
  } = props;
  console.log("CARD WIDTH", width);
  console.log("PROPSExplore", restaurants.length);
  console.log("PROPSExploreFirstRestaurantLocation", restaurants[0].location);
  console.log("PROPSExploreLocation", location);
  const navigation = useNavigation();

  const [markers, setMarkers] = useState(
    restaurants.map((restaurant) => {
      return {
        coordinate: {
          latitude: restaurant.location.latitude,
          longitude: restaurant.location.longitude,
        },
        name: restaurant.name,
        description: restaurant.description,
        image: restaurant.images[0],
        address: restaurant.address,
        id: restaurant.id,
        rating: restaurant.averageRating,
      };
    })
  );
  useEffect(() => {
    setMarkers(
      restaurants.map((restaurant) => {
        return {
          coordinate: {
            latitude: restaurant.location.latitude,
            longitude: restaurant.location.longitude,
          },
          name: restaurant.name,
          description: restaurant.description,
          image: restaurant.images[0],
          address: restaurant.address,
          id: restaurant.id,
          rating: restaurant.averageRating,
        };
      })
    );
  }, [restaurants]);
  useEffect(() => {
    setState({
      markers,
      // region: {
      //   latitude: 37.78825,
      //   longitude: -122.4324,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // },
      region: {
        latitude: restaurants[0].location.latitude,
        longitude: restaurants[0].location.longitude,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    });
  }, [markers]);

  const initialMapState = {
    markers,

    // region: {
    //   latitude: 37.78825,
    //   longitude: -122.4324,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // },
    region: {
      latitude: restaurants[0].location.latitude,
      longitude: restaurants[0].location.longitude,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };
  const [state, setState] = useState(initialMapState);
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
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = useRef(null);
  const _scrollView = useRef(null);
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        ref={_map}
        // initialRegion = {state.region}
        region={state.region}
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
                  source={require("../../../../assets/img/matti-ecoadvisor263.png/")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        decelerationRate={10}
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
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
          <View
            style={{
              flex: 1,
              elevation: 2,
              backgroundColor: "#FFF",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginHorizontal: 10,
              shadowColor: "#000",
              shadowRadius: 5,
              shadowOpacity: 0.3,
              shadowOffset: { x: 2, y: -2 },
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
              marginBottom: 15,
              overflow: "hidden",
              borderRadius: 20,
            }}
            key={index}
          >
            <View style={styles.cardImage} key={index}>
              <Image
                onPress={() => goToDetails(marker)}
                // style={{ width: "100%", height: "100%" }}
                style={styles.img}
                // if there is marker.image, use it, otherwise use the default image from the assets
                source={
                  marker.image
                    ? { uri: marker.image }
                    : require("../../../../assets/img/image-not-showing.webp/")
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

                {/* <Rating
                  imageSize={10}
                  readonly
                  startingValue={marker.rating | 0}
                /> */}
              </View>

              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.address}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>

              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => goToDetails(marker)}
                  style={[
                    styles.signIn,
                    // {
                    //   // borderRadius: 15,
                    //   // borderColor: "#FF6347",
                    //   // borderWidth: 1,
                    // },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    See details{" "}
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
