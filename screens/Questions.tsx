import { Text, View, Button, StyleSheet, Platform, ScrollView, useWindowDimensions, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import QuestionsCarousel from '../components/QuestionsCarousel'
import { collection, getDocs } from "firebase/firestore"; 


import db from '../firebase/config'
import { AuthErrorCodes } from 'firebase/auth';

const Questions = ({navigation}) => {

  const {height} = useWindowDimensions();
  const SIZE = height * 0.8;
  const [companyQuestions, setCompanyQuestions] = React.useState([])
  const [communityQuestions, setCommunityQuestions] = React.useState([])
  const [tagSelections, setTagSelections] = React.useState<{[key: string]:boolean}>({
    "Eczema":false, 
    "Acne":false,
    "Psoriasis":false,
    "Rosacea":false,
    "Contact Dermatitis":false,
    "Alopecia":false
  });

  const [tagColors, setTagColors] = React.useState({
    "Eczema":'#BEA8A7', 
    "Acne":'#C09891',
    "Psoriasis":'#775144',
    "Rosacea":'#2A0800',
    "Contact Dermatitis":'#C09891',
    "Alopecia":'#775144'
  });

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
    <View style={{backgroundColor:'white', height: 680}}>
    <ScrollView bounces={false}>
      <View style={{backgroundColor: 'white'}}>
        <ScrollView style={{marginLeft: 10, marginBottom: 25, marginTop: 15}} horizontal={true} showsHorizontalScrollIndicator={false} bounces={true}>
          {Object.keys(tagSelections).map((tag)=>
              <Pressable onPress={()=> setTagSelections((previous)=>({...previous, [tag]:!previous[tag]}))} 
                         style={[tagSelections[tag] ? styles.pressedTags : styles.unpressedTags, {backgroundColor: tagColors[tag]}]}>
                  <Text style={[styles.filterText]}>{tag}</Text>
              </Pressable>
          )}
        </ScrollView>
      </View>

        
      <SafeAreaView style={styles.container}>
        
        <QuestionsCarousel data={companyQuestions}/>
        
              {communityQuestions.map((question)=>
              {
              if(Object.keys(tagSelections).filter((tag)=>tagSelections[tag]).length == 0 || intersection(question.tags, Object.keys(tagSelections).filter((tag)=>tagSelections[tag])).length != 0)
              {
                return(
                  <Pressable onPress={()=> {navigation.navigate("CommunityPostQuestion",{question : question})}}>
                    <View>
                      <View style={{width: SIZE, marginBottom: 18}} key={question.id}>
                        <View style={styles.imageContainer}>
                          <Text style={styles.cardText} key={question.id}> {question.title} </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                )
                }
              })}
              <View style={styles.ask}>
                <Button 
              title="Ask a Question"
              color="white"
              onPress={()=> {navigation.navigate("AskQuestion")}}
              />
              </View>
      </SafeAreaView>
    </ScrollView>
    </View>
  )
}

function intersection(a, b)
{
  return a.filter(value => b.includes(value));
}

const styles =  StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  imageContainer: {
    borderRadius: 34,
    // overflow: 'hidden',
    backgroundColor: '#EAE0D5',
    width: 368,
    height: 190,
    marginLeft: 10,
    // position: 'absolute',
    // zIndex: 2,
    shadowColor: 'black', shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5, shadowRadius: 1, elevation: 2
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
 ask: {
  width: 250,
  marginLeft: 68,
  borderRadius: 20,
  backgroundColor: '#94a817'
 },
  pressedTags: {
    borderWidth: 0,
    height: 40, 
    backgroundColor: '#BEA8A7', 
    borderRadius: 30, 
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    shadowColor: 'black', shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5, shadowRadius: 1, elevation: 2,
    borderWidth: 1.3,
    borderColor: 'black',
  },
unpressedTags: {
    borderWidth: 0,
    height: 40, 
    backgroundColor: '#BEA8A7', 
    borderRadius: 30, 
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    shadowColor: 'black', shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5, shadowRadius: 1, elevation: 2
  }
})

export default Questions

