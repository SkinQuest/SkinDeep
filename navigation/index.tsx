/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { ColorSchemeName, Text, View, TextInput, Button, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import Profile from '../screens/Profile';
import Questions from '../screens/Questions';
import Feed from '../screens/Feed';
import AskQuestion from '../screens/AskQuestion';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { UserContext } from '../components/UserContext';

import db from '../firebase/config'


let auth = getAuth();

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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState();

  if (!user){
    return (
      <View style={styles.centered}>
        <Text> Login Here:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          onPress={() => {
            console.log('signing in');
            async function signIn() {
              signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const newUser = userCredential.user;
                console.log(newUser.email)
                setUser(newUser.email);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("ERROR")
                console.log(errorMessage);
              });
            }
            signIn();
            console.log('signed in')
          }}
          title="Login"
          color="#841584"
        />
      </View>
  );
  }
  else {
    return (
      <UserContext.Provider value={user}>
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
      </UserContext.Provider> 
    );
  }
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
