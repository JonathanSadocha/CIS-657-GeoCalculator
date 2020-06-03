import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalculatorScreen from './screens/CalculatorScreen';
import SettingsScreen from './screens/SettingsScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
      <NavigationContainer>
          <Stack.Navigator screenOptions={navStyling}>
            <Stack.Screen name="Geo Calculator" component={CalculatorScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const navStyling = {
  headerStyle: {
    backgroundColor: '#0065A4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D3D4C5',
    flex: 1,
    justifyContent: 'center',
  },
});
