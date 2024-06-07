import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();
function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
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
