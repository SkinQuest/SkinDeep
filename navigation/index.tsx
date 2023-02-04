/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { ColorSchemeName} from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import Profile from '../screens/Profile';
import Questions from '../screens/Questions';
import Feed from '../screens/Feed';
import AskQuestion from '../screens/AskQuestion';
import CompanyPostQuestion from '../screens/CompanyPostQuestion';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator
    screenOptions={{ animation: 'fade' }}>
      <Stack.Screen 
          name="Root" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }} />
      <Stack.Screen
          name="AskQuestion"
          component={AskQuestion}
          options={{ headerShown: true }} />
      <Stack.Screen
          name="CompanyPostQuestion"
          component={CompanyPostQuestion}
          options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Enter"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { height: 100,},
      }}>
      <BottomTab.Screen
        name="Feed"
        component={Feed}
      />
      <BottomTab.Screen
        name="Questions"
        component={Questions}
      />
       <BottomTab.Screen
          name="Profile"
          component={Profile}
      />
    </BottomTab.Navigator>
  );
}


