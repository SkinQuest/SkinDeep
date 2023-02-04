import { Text, View, Button, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/Ionicons';
import React from 'react'
import ProfileButton from '../components/ProfileButton'


const openChat = () => {
  console.log("Message button clicked!");
}

// const ProfileButton = (whatFunction : string) => {
//   return(
//     <View>
//       <Text>{whatFunction}</Text>
//       if (whatFunction == "message"){
//           <FontAwesome.Button
//             name="paper-plane"
//             size={15}
//             color="white"
//             backgroundColor="#29524A"
//             onPress ={openChat}
//           >
//             Message
//           </FontAwesome.Button>
//         }

//     </View>
//   );
// }



const Profile = () => {
  return (
    <View>
      <Text>poo poo</Text>
      <ProfileButton
        text="message"
      />
      <ProfileButton text="block"/>
      
    </View>
  )
} 

type ProfileData = {
  username: string;
}



export default Profile;


