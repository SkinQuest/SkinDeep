import { Text, View, Button, StyleSheet, Platform, ScrollView, useWindowDimensions, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import QuestionsCarousel from '../components/QuestionsCarousel'
import { collection, getDocs } from "firebase/firestore"; 


import db from '../firebase/config'

const Questions = ({navigation}) => {

  const {width} = useWindowDimensions();
  const SIZE = width * 0.7;
  const [companyQuestions, setCompanyQuestions] = React.useState([])
  const [communityQuestions, setCommunityQuestions] = React.useState([])

  React.useEffect(() => {
    // Fetch questions from firebase
    async function fetchCompanyQuestions()
    {
      var newQuestions = []
      const querySnapshot = await getDocs(collection(db, "CompanyQuestions"));
      querySnapshot.forEach((doc) => {
        newQuestions.push(doc.data());
      });
      setCompanyQuestions(newQuestions);
    }
    async function fetchCommunityQuestions()
    {
      var newQuestions = []
      const querySnapshot = await getDocs(collection(db, "Questions"));
      querySnapshot.forEach((doc) => {
        newQuestions.push(doc.data());
        console.log(doc.data())
      });
      setCommunityQuestions(newQuestions);
    }
    fetchCommunityQuestions()
    fetchCompanyQuestions()
  }, []);

  return (
    
    <ScrollView bounces={false}>
    <View style={{backgroundColor: 'white'}}>
    <ScrollView style={{marginLeft: 10, marginBottom: 25, marginTop: 15}} horizontal={true} showsHorizontalScrollIndicator={false} bounces={true}>
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
      </View>
      
    <SafeAreaView style={styles.container}>
       
      <QuestionsCarousel data={companyQuestions}/>
      
            {communityQuestions.map((question)=>
            <Pressable onPress={()=> {navigation.navigate("CommunityPostQuestion",{question : question})}}>
            <View>
              <View style={{width: SIZE}} key={question.id}>
                <View style={styles.imageContainer}>
                  <Text key={question.id}> {question.title} </Text>
                </View>
              </View>
            </View>
            </Pressable>
            )}
      
      {communityQuestions.map((question)=>
        <View>
          
        </View>

      )}
       <Button
          title="Ask a Question"
          onPress={()=> {navigation.navigate("AskQuestion")}}
       />
    </SafeAreaView>
    </ScrollView>
  )
}



const styles =  StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  imageContainer: {
    borderRadius: 34,
    overflow: 'hidden',
    backgroundColor: 'blue',
    width: 300,
    height: 100,
    margin: 10,
  },
  cardText: {
      fontSize: 30,
      padding: 10,
      marginLeft: 20 
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
})

export default Questions

