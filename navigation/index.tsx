/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { ColorSchemeName, Pressable} from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import Profile from '../screens/Profile';
import Questions from '../screens/Questions';
import Feed from '../screens/Feed';
import AskQuestion from '../screens/AskQuestion';

// icons
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 


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
        options=
        {{
          headerTitle:"",
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name="cards-variant" size={30} color="black" />
        }}
      />
      <BottomTab.Screen
        name="Questions"
        component={Questions}
        options=
        {{
          headerTitle:"",
          tabBarIcon: ({ color, focused }) => 
            <MaterialCommunityIcons name="comment-question-outline" size={30} color={focused ? "black" : "gray"} />
        }}
      />
       <BottomTab.Screen
          name="Profile"
          component={Profile}
          options=
          {{
            headerTitle:"",
            tabBarIcon: ({ color, focused }) => <MaterialIcons name="person-outline" size={30} color={focused ? "black" : "gray"} />
          }}
      />
    </BottomTab.Navigator>
  );
}


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}) {
  return <FontAwesome size={38} style={{ marginBottom: -3, color: "blue", marginTop:5 }} 
  
  {...props} />;
}
