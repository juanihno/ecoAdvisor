import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen";
const Stack = createNativeStackNavigator();

export function AddStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.add.add}
        component={AddRestaurantScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
