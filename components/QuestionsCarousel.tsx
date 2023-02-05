import { View, Pressable, Text, useWindowDimensions, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const QuestionsCarousel = ({data}) => {
    const {width} = useWindowDimensions();
    const SIZE = width * 0.7;
    const SPACER = (width - SIZE) / 2;
    const navigation = useNavigation();

    return (
      <><View>
        <ScrollView style={{marginLeft: 10, marginBottom: 25, marginTop: -30}} horizontal={true} showsHorizontalScrollIndicator={false} bounces={true}>
          <View style={styles.filterButtons}>
            <Text style={styles.filterText}>Eczema</Text>
          </View>
          <View style={[styles.filterButtons, {backgroundColor: '#C09891'}]}>
            <Text style={styles.filterText}>Acne</Text>
          </View>
          <View style={[styles.filterButtons, {backgroundColor: '#775144'}]}>
            <Text style={styles.filterText}>Psoriasis</Text>
          </View>
          <View style={[styles.filterButtons, {backgroundColor: '#2A0800'}]}>
            <Text style={styles.filterText}>Rosacea</Text>
          </View>
          <View style={[styles.filterButtons, {backgroundColor: '#C09891'}]}>
            <Text style={styles.filterText}>Contact Dermatitis</Text>
          </View>
          <View style={[styles.filterButtons, {backgroundColor: '#775144'}]}>
            <Text style={styles.filterText}>Alopecia</Text>
          </View>
        </ScrollView>
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
                      {/* <Text style={styles.cardText}> {question.title} </Text> */}
                      {/* <Text> {question.body} </Text> */}
                      <Text style={styles.cardText}>What foods do you feel you are allergic to?</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })};
          </Text>
        </ScrollView>
      </View><View>
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
      marginTop: -8,
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
      width: 250,
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
    filterButtons: { 
      borderWidth: 0,
      height: 40, 
      backgroundColor: '#BEA8A7', 
      borderRadius: 30, 
      marginRight: 10,
      marginBottom: 5,
      marginTop: 5,
      shadowColor: 'black', shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5, shadowRadius: 1, elevation: 2
    },
    filterText: { 
      color: 'white',
      fontSize: 12, 
      margin: 10, 
      marginTop: 12, 
      fontWeight:'bold'
    }
});