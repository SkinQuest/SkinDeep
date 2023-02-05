import { Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';

export default function Feed({navigation}) {

  return (
    <View style={{backgroundColor:'white', height: 650 }}>
      <Image
        source={require('../assets/skindeep.png')}
        style={{ width: 200, height: 200, marginLeft: 86, marginTop: 35 }}
      />

      <View style={{marginTop: -5, padding: 30}}>
        <Text style={{color: 'black', lineHeight: 24}}>
        At SkinDeep, we understand the importance of community in overcoming skin problems. That's why our app serves as a hub for individuals to connect, share their experiences, and support each other. Our platform offers a space for individuals to ask and answer questions, fostering a community of shared knowledge and support. By providing a supportive network, we aim to help individuals find relief and improve their skin health. Whether it's sharing advice on managing symptoms, discussing triggers, or simply offering a listening ear, our community platform is designed to empower individuals to take control of their skin journey and find the support they need.
        </Text>
      </View>
   </View>
  );
}



