import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();
function AppStack() {
  const { logout } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerRight: () => <Button title='log out' onPress={logout}/>}}
        name="Home"
        component={() => (
          <View>
            <Text>This is a homepage</Text>
          </View>
        )}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
