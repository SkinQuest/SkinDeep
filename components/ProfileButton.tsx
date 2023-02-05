import { Text, View, Button, StyleSheet, FlatList, Pressable } from 'react-native';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';


const editProf = () => {
    console.log("Edit button clicked!");
  }

const showFriends = () => {
    console.log("Friends button clicked!");
  }

const reportUser = () => {
  console.log("Report button clicked!");
}

interface Title {
    text: String
}

const BUTTON = [
  {
    type: "edit profile",
    function: editProf,
  },
  {
    type: "friends",
    function: showFriends,
  },
  {
    type: "Report",
    function: reportUser,
  },
];

const EditIcon = () => {
  return (
    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{color: "black"}}/>
  );
}

const ProfileButton = (props : Title) => {
    if (props.text == "edit profile"){
      return(
        <View style={styles.appButtonContainer}>
          <Pressable onPress={showFriends}>
           <FontAwesome5 name="users" size={24} color="black" />
          </Pressable>
          <Button 
            title={"Edit Profile"}
          />
        </View>
      );
    }

    else if (props.text == "friends"){
      return(
        <View style={styles.appButtonContainer}>
          <Pressable onPress={showFriends}>
           <FontAwesome5 name="users" size={24} color="black" />
          </Pressable>
          <Button
            title={"Friends"}
          />
        </View>
      );
    }
  }

  export default ProfileButton;




const styles = StyleSheet.create({
    appButtonContainer: {
        borderRadius: 40,
        marginLeft: 50,
        textAlign : "center",
        alignContent: "center",
        flexDirection: "row",
        alignSelf: "center"
    },
});
