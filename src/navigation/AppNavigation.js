import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements';
import { screen } from '../utils';
import { RestaurantStack } from './RestaurantStack';
import { FavoritesStack } from './FavoritesStack';
import { SearchStack } from './SearchStack';
import { RankingStack } from './RankingStack';
import { AccountStack } from './AccountStack';
import { AddStack } from './AddStack';
import { AddRestaurantScreen } from '../screens/Restaurants/AddRestaurantScreen/AddRestaurantScreen';
import { RankingScreen } from '../screens/RankingScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
// import { RankingScreen } from "../screens/RankingScreen";
// import { AccountScreen } from "../screens/Account/AccountScreen";
// import { SearchScreen } from "../screens/SearchScreen";
// import { rankingStack } from "./RankingStack";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export function AppNavigation() {
  const [haslogged, setHasLogged] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#00a680',
        tabBarInactiveTintColor: '#646464',
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={screen.restaurant.tab}
        component={RestaurantStack}
        options={{ title: 'Explore' }}
      />
      <Tab.Screen
        name={screen.favorites.tab}
        component={FavoritesStack}
        options={{ title: 'Favorites' }}
      />
      <Tab.Screen
        name={screen.ranking.tab}
        component={RankingStack}
        options={{ title: 'Ranking' }}
      ></Tab.Screen>
      {/* <Tab.Screen
        name={screen.search.tab}
        component={SearchStack}
        options={{ title: "Search" }}
      />  */}
      <Tab.Screen
        name={screen.account.tab}
        component={AccountStack}
        options={{ title: 'Account' }}
      />
      {haslogged && (
        <Tab.Screen
          name={screen.add.tab}
          component={AddStack}
          options={{ title: 'Add' }}
        />
      )}
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screen.restaurant.tab) {
    iconName = 'compass-outline';
  }
  if (route.name === screen.favorites.tab) {
    iconName = 'heart-outline';
  }
  if (route.name === screen.ranking.tab) {
    iconName = 'star-outline';
  }
  if (route.name === screen.account.tab) {
    iconName = 'account-outline';
  }
  if (route.name === screen.search.tab) {
    iconName = 'magnify';
  }
  if (route.name === screen.add.tab) {
    iconName = 'plus-box-outline';
  }
  return (
    <Icon type="material-community" name={iconName} size={size} color={color} />
  );
}
