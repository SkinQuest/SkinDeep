import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  Button
} from "react-native";
import FontAwesomeIcon from '@expo/vector-icons/Ionicons';
import React from 'react';
import ProfileButton from '../components/ProfileButton';
import { Text, Block, theme } from 'galio-framework';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;


/*


const Profile = () => {
  return (
    <View>
      <View style={styles2.appButtonsContainer}>
        <Text>ABC abcdefg</Text>
        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{color: "black"}}/>
        <ProfileButton text="edit profile"/>
        <FontAwesomeIcon icon="fa-solid fa-users" style={{color: "black"}}/>
        <ProfileButton text="friends"/>
      </View>

    </View>
  )
} 

type ProfileData = {
  username: string;
  bio: string
}

*/

class Profile extends React.Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white', marginTop: -20}}>
      <Block flex style={styles.profile}>
        <Block flex>
        <ImageBackground
            source={require("../assets/anteater.png")}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                  <Image
                    source={require('../assets/gillman.png')}
                    style={styles.avatar}
                  />
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="black">
                      Chancellor Anteater
                    </Text>
                    <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20 }}
                  >
                    <Button
                    title="Edit Profile"
                    color='gray'
                    />
                    
                  </Block>
                  </Block>
                  <Block middle style={{ marginTop: 20, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                  <Text
                      size={12}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      Bio
                      </Text>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center", margin:20}}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem.
                    </Text>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
            </ImageBackground>
        </Block>
</Block>
</SafeAreaView>
);
}
}

export default Profile;

const styles = StyleSheet.create({
  profile: {
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    marginTop: 5
  },
  profileBackground: {
    width: "100%",
    height: "25%"
  },
  profileCard: {
    // position: "relative",
    padding: 10,
    marginHorizontal: 10,
    marginTop: "50%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 3,
    borderColor: 'white'
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});


const styles2 = StyleSheet.create({
  appButtonsContainer: {
    textAlign: "center",
    alignContent: "center",
    flexDirection: "row",
  }
});