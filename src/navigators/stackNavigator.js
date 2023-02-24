import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { Colors } from "../constants/colors";
import { HomeScreen } from "../screens";

const Stack = createNativeStackNavigator();

const StackNavigator = (props) => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={Colors.snowWhite}
        barStyle={"dark-content"}
      />
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          options={{ animation: "fade" }}
          name={"HomeScreen"}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
