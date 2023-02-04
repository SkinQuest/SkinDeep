import { Text, View, Button, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/Ionicons';
import React from 'react';

const openChat = () => {
    console.log("Message button clicked!");
  }

interface Title {
    text: String
}

const styles = StyleSheet.create({
    appButtonContainer: {
        borderRadius: 15,
        padding: 5,
        width: '5px'
    },
});

const ProfileButton = (props : Title) => {
    return(
      <View>
        <Text>{props.text}</Text>
        if (props.text == "message"){
            <FontAwesome.Button
              style={styles.appButtonContainer}
              name="paper-plane"
              color="white"
              backgroundColor="#29524A"
              onPress ={openChat}
            >
              Message
            </FontAwesome.Button>
          }
        else if (props.text == "block"){
            <FontAwesome.Button
              style={styles.appButtonContainer}
              name="paper-plane"
              color="red"
              backgroundColor="white"
              onPress ={openChat}
            >
              Message
            </FontAwesome.Button>
          }
  
      </View>
    );
  }

  export default ProfileButton;