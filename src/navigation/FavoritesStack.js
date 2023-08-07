import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { FavoritesScreen } from "../screens//Restaurants/FavoritesScreen/FavoritesScreen";
import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen/RestaurantScreen";
import { AddReviewRestaurantScreen } from "../screens/Restaurants/AddReviewRestaurantScreen";
import { ReviewsScreen } from "../screens/Restaurants/ReviewsScreen";

const Stack = createNativeStackNavigator();

export function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.favorites.favorites}
        component={FavoritesScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={screen.favorites.restaurant}
        component={RestaurantScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={screen.favorites.addReviewRestaurant}
        component={AddReviewRestaurantScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={screen.favorites.reviewsRestaurant}
        component={ReviewsScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
