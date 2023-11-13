import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, Platform } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoadingModal } from "../../components";
import { UserGuestScreen } from "./UserGuestScreen/UserGuestScreen";
import { UserLoggedScreen } from "./UserLoggedScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Reviews } from "../../components/Restaurant";
import { UserReviewsScreen } from "./UserReviewsScreen/UserReviewsScreen";
import { UserRestaurantScreen } from "./UserRestaurantScreen/UserRestaurantScreen";
export function AccountScreen() {
  const TopTab = createMaterialTopTabNavigator();

  const [hasLogged, setHasLogged] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);
  const FavoritesComponent = () => {
    if (hasLogged === null) {
      return <LoadingModal show text="Cargando" />;
    }

    return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
  };

  return hasLogged ? (
    <TopTab.Navigator
      initialRouteName="My profile"
      tabBarPosition="top"
      screenOptions={{
        swipeEnabled: false,
        // swipeEnabled: Platform.OS === "ios" ? false : true,
        tabBarActiveTintColor: "#95b53b",
        tabBarInactiveTintColor: "#646464",
        tabBarShowIcon: true,
        tabBarLabelStyle: {
          textAlign: "center",
        },
        tabBarStyle: {
          backgroundColor: "#f2f2f2",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },
        // renderIndicator: () => null,
      }}
      // swipeEnabled={true}
      // tabBarOptions={{
      //   activeTintColor: "#95b53b",
      //   inactiveTintColor: "#646464",
      //   style: {
      //     backgroundColor: "#f2f2f2",
      //   },
      //   // indicatorStyle: {
      //   //   opacity: 0,
      //   // },
      //   renderIndicator: () => null,

      //   labelStyle: {
      //     textAlign: "center",
      //   },
      //   showIcon: true,
      // }}
      // // screenOptions={{
      // //   tabBarLabelStyle: { fontSize: 12 },
      // //   tabBarItemStyle: { width: 100 },
      // //   tabBarStyle: { backgroundColor: "powderblue" },
      // // }}
    >
      <TopTab.Screen
        name="My profile"
        component={FavoritesComponent}
        // component={() =>
        //   hasLogged === null ? (
        //     <LoadingModal show text="Loading..." />
        //   ) : hasLogged ? (
        //     <UserLoggedScreen />
        //   ) : (
        //     <UserGuestScreen />
        //   )
        // }
      />
      <TopTab.Screen
        name="My reviews"
        component={UserReviewsScreen}
        // component={() => <UserReviewsScreen />}
      />
      <TopTab.Screen
        name="My business"
        component={UserRestaurantScreen}
        // component={() => <UserReviewsScreen />}
      />
      {/* <TopTab.Screen
        name="My favorites"
        component={() =>
          hasLogged === null ? (
            <LoadingModal show text="Loading..." />
          ) : hasLogged ? (
            <UserLoggedScreen />
          ) : (
            <UserGuestScreen />
          )
        }
      /> */}
    </TopTab.Navigator>
  ) : (
    <UserGuestScreen />
  );
}

//   if (hasLogged === null) return <LoadingModal show text="Loading..." />;

//   {
//     return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
//   }
// }
