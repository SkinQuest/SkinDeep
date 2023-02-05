import { View, Pressable, Text, useWindowDimensions, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const QuestionsCarousel = ({data}) => {
    const {width} = useWindowDimensions();
    const SIZE = width * 0.8;
    const SPACER = (width - SIZE) / 2;
    const navigation = useNavigation();

    return (
      <><View>
        
        <Text style={styles.companyTitle}> Daily Questions  </Text>
        <Text style={styles.subTitle}>Answer questions, make an impact. </Text>
        <ScrollView
          horizontal
          bounces={true}
          showsHorizontalScrollIndicator={false}>
          <Text>
            {data.map((question, index) => {
              if (!question) {
                return (
                  <View style={{ width: SPACER }} key={index} />
                );
              }
              return (
                <Pressable onPress={() => { navigation.navigate("CompanyPostQuestion", { question: question }); } }>
                  <View style={{ width: SIZE }} key={index}>
                    <View style={styles.imageContainer}>
                      <Text style={styles.cardText}> {question.title} </Text>
                      {/* <Text> {question.body} </Text> */}
                      {/* <Text style={styles.cardText}>What foods do you feel you are allergic to?</Text> */}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </Text>
        </ScrollView>
      </View>
      <View>
          <Text style={styles.communityTitle}> Community</Text>
          <Text style={styles.subTitle}>Answer questions from your community!</Text>
      </View></>
    );
  };

export default QuestionsCarousel

const styles = StyleSheet.create({
    companyTitle:{
      color: '#8C8C8C',
      fontSize: 32,
      marginTop: -55,
      marginBottom: 15,
      marginLeft: 18,
      fontWeight: 'bold'
    },
    communityTitle:{
      color: '#8C8C8C',
      fontSize: 32,
      marginTop: 25,
      marginBottom: 15,
      marginLeft: 15,
      fontWeight: 'bold'
    },
    subTitle:{
      color: '#555555',
      fontSize: 14,
      marginTop: -10,
      marginBottom: 15,
      marginLeft: 25,
    },
    imageContainer: {
      borderRadius: 34,
      // overflow: 'hidden',
      backgroundColor: '#EAE0D5',
      width: 300,
      height: 200,
      marginLeft: 10,
      // position: 'absolute',
      // zIndex: 2,
      shadowColor: 'black', shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5, shadowRadius: 1, elevation: 2
    },
    cardText: {
       color: '#775144',
       fontWeight: 'bold',
       fontSize: 30,
       padding: 10,
       margin: 5, 
       marginLeft: 10,
       marginRight: 10,
    },
    
});