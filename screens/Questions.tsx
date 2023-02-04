import { Text, View, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import QuestionsCarousel from '../components/QuestionsCarousel'

const Questions = () => {
  const data = [
    {image: require('../assets/adaptive-icon.png'),},
    {image: require('../assets/favicon.png'),},
    {image: require('../assets/icon.png'),},
    {image: require('../assets/splash.png'),},
  ];

  return (
    <SafeAreaView style={styles.container}>
        <QuestionsCarousel data={data}/>
    </SafeAreaView>
  )
}

export default Questions

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})