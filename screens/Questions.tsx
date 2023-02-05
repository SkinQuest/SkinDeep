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
    <SafeAreaView style={styles.container}>
       
      <QuestionsCarousel data={companyQuestions}/>
      <ScrollView>
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
      </ScrollView>
      {communityQuestions.map((question)=>
        <View>
          
        </View>

      )}
       <Button
          title="Ask a Question"
          onPress={()=> {navigation.navigate("AskQuestion")}}
       />
    </SafeAreaView>
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
  }
})

export default Questions

