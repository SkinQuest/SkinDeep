/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { ColorSchemeName, Text, View, TextInput, Button, StyleSheet,  Pressable } from 'react-native';
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
import CommunityPostQuestion from '../screens/CommunityPostQuestions';

// icons
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


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

  // if (!user){
    if(false) {
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
    console.log(user)
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
            options={{ headerShown: true, headerTitle: "" }} />
          <Stack.Screen
            name="CompanyPostQuestion"
            component={CompanyPostQuestion}
            options={{ headerShown: true,
              headerTitle:"",
          }} />
          <Stack.Screen
            name="CommunityPostQuestion"
            component={CommunityPostQuestion}
            options={{ headerShown: true,
              headerTitle:"",
            }} />
        </Stack.Navigator>
      </UserContext.Provider> 
    );
  }
}



/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>(
);

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Enter"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { height: 100,},
      }}
      >
      <BottomTab.Screen
        name="Feed"
        component={Feed}
        options=
        {{
          tabBarShowLabel: false,
          headerTitle:"",
          tabBarIcon: ({ color, focused }) => <><MaterialCommunityIcons name="cards-variant" size={30} color={focused ? "black" : "gray"}/>
          <Text style={{ marginTop: 5, fontSize: 12, color: focused ? "black" : "gray", fontWeight: focused ? "bold" : "normal" }}>About</Text></>,
          headerLeft:() => (
            <Text style={{position: 'absolute', marginLeft: 10, marginTop: 2, fontSize: 28, fontWeight: 'bold'}}></Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="Questions"
        component={Questions}
        options=
        {{
          tabBarShowLabel: false,
          headerTitle:"",
          tabBarIcon: ({ color, focused }) => 
            <><MaterialCommunityIcons name="comment-question-outline" size={30} color={focused ? "black" : "gray"} />
            <Text style={{marginTop: 5,  fontSize: 12, color: focused ? "black" : "gray", fontWeight: focused ? "bold" : "normal"  }}>Questions</Text></>,
          headerLeft:() => (
              <Text style={{position: 'absolute', marginLeft: 20, marginTop: 5, fontSize: 30, marginBottom: 10, fontWeight: 'bold'}}>Questions</Text>
          ),
          headerRight:() => (
            <FontAwesome5 name="bell" size={30} color="black"style={{marginRight: 30, }} />
          )
        }}
      />
       <BottomTab.Screen
          name="Profile"
          component={Profile}
          options=
          {{
            tabBarShowLabel: false,
            headerTitle:"",
            tabBarIcon: ({ color, focused }) => <><MaterialIcons name="person-outline" size={30} color={focused ? "black" : "gray"} />
            <Text style={{ marginTop: 5, fontSize: 12, color: focused ? "black" : "gray", fontWeight: focused ? "bold" : "normal"  }}>Profile</Text></>,
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
