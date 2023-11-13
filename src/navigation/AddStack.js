import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen";
import { BusinessTypeScreen } from "../screens/Restaurants/BusinessTypeScreen";
import { RestaurantFormTypeScreen } from "../screens/Restaurants/RestaurantFormTypeScreen";
import { ShopFormTypeScreen } from "../screens/Restaurants/ShopFormTypeScreen";
import { AddRestaurantHomeScreen } from "../screens/Restaurants/addRestauranHomeScreen/addRestaurantHomeScreen";

const Stack = createNativeStackNavigator();

export function AddStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.add.addHome}
        component={AddRestaurantHomeScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={screen.add.add}
        component={AddRestaurantScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={screen.add.businessTypeForm}
        component={BusinessTypeScreen}
        options={{ title: "" }}
      />

      <Stack.Screen
        name={screen.add.restaurantTypeForm}
        component={RestaurantFormTypeScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={screen.add.shopTypeForm}
        component={ShopFormTypeScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
