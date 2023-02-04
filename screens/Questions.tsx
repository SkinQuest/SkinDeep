import { Text, View, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import QuestionsCarousel from '../components/QuestionsCarousel'
import { collection, getDocs } from "firebase/firestore"; 

import db from '../firebase/config'

const Questions = () => {
//   const data = [
//     {image: require('../assets/adaptive-icon.png'),},
//     {image: require('../assets/favicon.png'),},
//     {image: require('../assets/icon.png'),},
//     {image: require('../assets/splash.png'),},
//   ];

  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    // Fetch questions from firebase
    async function fetchQuestions()
    {
      var newQuestions = []
      const querySnapshot = await getDocs(collection(db, "Questions"));
      querySnapshot.forEach((doc) => {
        newQuestions.push(doc.data());
      });
      setQuestions(newQuestions);
    }
    fetchQuestions()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <QuestionsCarousel data={questions}/>
    </SafeAreaView>
  )
}



const styles =  StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  }
})

export default Questions

