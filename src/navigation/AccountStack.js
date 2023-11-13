import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AccountScreen } from "../screens/Account/AccountScreen";
import { LoginScreen } from "../screens/Account/LoginScreen/LoginScreen";
import { RegisterScreen } from "../screens/Account/RegisterScreen";
import { EditRestaurantScreen } from "../screens/Account/EditRestaurantScreen/EditRestaurantScreen";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={screen.account.register}
        component={RegisterScreen}
        options={{ title: "Create your account" }}
      />
      <Stack.Screen
        name={screen.account.editRestaurant}
        component={EditRestaurantScreen}
        options={{ title: "Edit your restaurant" }}
      />
    </Stack.Navigator>
  );
}
