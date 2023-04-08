import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './ListRestaurants.styles';
import {
  Text,
  Image,
  Input,
  SearchBar,
  Dimensions,
} from 'react-native-elements';
import MapView from 'react-native-maps';
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
  width,
} from '../../../screens/Restaurants/RestaurantsScreen';
export function ListRestaurants(props) {
  console.log(
    'DIMENSIONS',
    MARGIN,
    CARD_WIDTH,
    CARD_HEIGHT,
    HEIGHT,
    SPACING_FOR_CARD_INSET
  );
  console.log('WIDTH', width);
  const { restaurants } = props;

  const restaurantsLocation = restaurants.map((restaurant) => {
    return {
      latitude: restaurant.data().location.latitude,
      longitude: restaurant.data().location.longitude,
      name: restaurant.data().name,
      description: restaurant.data().description,
    };
  });
  const [location, setLocation] = useState({
    latitude: 37.78583399999998,
    longitude: -122.40641700000003,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  });
  const initialMapState = {
    restaurantsLocation,
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
  const [state, setState] = useState(initialMapState);
  // console.log("STATE", state.restaurantsLocation[0].name);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'info',
          position: 'button',
          text1: 'Go to settings and enable location permission for this app',
        });
        return;
      }
      const locationTemp = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });

      console.log('LOCATIONTEMP', locationTemp);
    })();
  }, []);
  const x = new Animated.Value(0);

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [offsetStart, setOffsetStart] = useState(0);
  const [index, setIndex] = useState(0);

  const updatePosition = (index) => {
    setLatitude(restaurants[index].data().location.latitude);
    setLongitude(restaurants[index].data().location.longitude);
  };

  useEffect(() => {
    updatePosition(0);
  }, []);

  const updateState = (event) => {
    let position = event.nativeEvent.contentOffset.x;
    let i = Math.floor((position - offsetStart) / CARD_WIDTH);
    if (index !== i) {
      updatePosition(i);
      setIndex(i);
    }
  };

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { x },
        },
      },
    ],
    {
      listener: (event) => updateState(event),
      useNativeDriver: true,
    }
  );

  const _updateRangePositions = (offsetStart) => {
    setOffsetStart(offsetStart);
  };

  console.log('restaurantsLocation', restaurantsLocation);
  console.log('Height', CARD_HEIGHT);
  console.log('Width', CARD_WIDTH);
  console.log('MARGIN', MARGIN);
  const goToRestaurant = (restaurant) => {
    console.log('restaurant', restaurants);
  };
  const _flatListRef = React.useRef(null);
  const _mapRef = React.useRef(null);

  return (
    <View>
      <SearchBar
        placeholder="Busca tu restaurante"
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputSearch}
      />
      <MapView
        ref={_mapRef}
        initialRegion={state.region}
        provider="google"
        showsUserLocation={true}
        style={styles.mapStyle}
        onRegionChange={(locationTemp) => setLocation(locationTemp)}
      >
        {restaurantsLocation.map(
          (restaurant, index) => (
            console.log('restaurantindividual', restaurant),
            (
              <Marker
                key={index}
                coordinate={{
                  latitude: restaurant.latitude,
                  longitude: restaurant.longitude,
                }}
                title={restaurant.name}
                onPress={() => goToRestaurant(restaurant)}
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={require('../../../../assets/img/suMLIqqc.png/')}
                    style={[styles.marker]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </Marker>
            )
          )
        )}

        {/* <Marker draggable coordinate={location}></Marker> */}
      </MapView>
      {/* <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View> */}
      {/* <AnimatedFlatList
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={restaurants}
        renderItem={({ index, item }) => (
          <Store
            index={index}
            item={item}
            x={x}
            updateRangePositions={_updateRangePositions}
          />
        )}
        keyExtractor={(item) => item.index}
      /> */}

      {/* <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={restaurants}
        renderItem={(doc) => {
          const restaurant = doc.item.data();
          console.log("restaurantLOCALFOOD", restaurant.menu.LocalFood);
          return (
            <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
              <View style={styles.restaurant}>
                <Image
                  style={styles.image}
                  source={
                    restaurant.images[0]
                      ? { uri: restaurant.images[0] }
                      : require("../../../../assets/img/image-not-showing.webp/")
                  }
                />
                <View>
                  <Text style={styles.name}>{restaurant.name}</Text>
                  <Text style={styles.info}>{restaurant.address}</Text>
                  <Text style={styles.info}>{restaurant.description}</Text>
                  <Text style={styles.info}>
                    {restaurant.menu.LocalFood ? "LocalFood" : "NoLocalFood"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      /> */}
      <AnimatedFlatList
        ref={_flatListRef}
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => goToRestaurant(item)}
            style={styles.restaurant}
          >
            <Image
              style={styles.image}
              source={{ uri: item.data().images[0] }}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.data().name}</Text>
              <Text style={styles.address}>{item.data().address}</Text>
              <Text style={styles.description}>
                {item.data().description.substr(0, 30)}...
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
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
      />
    </View>
  );
}
