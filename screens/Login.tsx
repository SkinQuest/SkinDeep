import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import React from 'react';

import db from '../firebase/config'

const Login = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <Text>New Question:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.longInput}
        onChangeText={setPassword}
        value={password}
        multiline={true}
      />
      <Button
        onPress={() => login(email, password)}
        title="Post Question"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

async function login (email, password) {

}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  longInput: {
    height: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;

