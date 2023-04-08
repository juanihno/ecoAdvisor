import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen } from '../utils';
import { RestaurantsScreen } from '../screens/Restaurants/RestaurantsScreen/RestaurantsScreen';
import { AddRestaurantScreen } from '../screens/Restaurants/AddRestaurantScreen/AddRestaurantScreen';
import { EcoFormScreen } from '../screens/Restaurants/EcoFormScreen/EcoFormScreen';
import { BusinessTypeScreen } from '../screens/Restaurants/BusinessTypeScreen/BusinessTypeScreen';
import { RestaurantFormTypeScreen } from '../screens/Restaurants/RestaurantFormTypeScreen/RestaurantFormTypeScreen';
import { ShopFormTypeScreen } from '../screens/Restaurants/ShopFormTypeScreen/ShopFormTypeScreen';
import { RestaurantScreen } from '../screens/Restaurants/RestaurantScreen/RestaurantScreen';
import { AddReviewRestaurantScreen } from '../screens/Restaurants/AddReviewRestaurantScreen';
import { ReviewsScreen } from '../screens/Restaurants/ReviewsScreen';

const Stack = createNativeStackNavigator();

export function RestaurantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.restaurants}
        component={RestaurantsScreen}
        options={{
          title: 'Restaurants',
        }}
      />
      <Stack.Screen
        name={screen.restaurant.addRestaurant}
        component={AddRestaurantScreen}
        options={{ title: 'New Business' }}
      />
      <Stack.Screen
        name={screen.restaurant.restaurantForm}
        component={EcoFormScreen}
        options={{ title: 'Restaurant form' }}
      />
      <Stack.Screen
        name={screen.restaurant.businessTypeForm}
        component={BusinessTypeScreen}
        options={{ title: ' Business type' }}
      />
      <Stack.Screen
        name={screen.restaurant.restaurantTypeForm}
        component={RestaurantFormTypeScreen}
        options={{ title: 'Restaurant form' }}
      />
      <Stack.Screen
        name={screen.restaurant.shopTypeForm}
        component={ShopFormTypeScreen}
        options={{ title: 'Shop form' }}
      />
      <Stack.Screen
        name={screen.restaurant.restaurant}
        component={RestaurantScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={screen.restaurant.addReviewRestaurant}
        component={AddReviewRestaurantScreen}
        options={{ title: 'Add review' }}
      />
      <Stack.Screen
        name={screen.restaurant.reviewsRestaurant}
        component={ReviewsScreen}
        options={{ title: 'Reviews' }}
      />
    </Stack.Navigator>
  );
}
