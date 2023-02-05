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
              if(intersection(question.tags, Object.keys(tagSelections).filter((tag)=>tagSelections[tag])).length != 0)
              {
                return(
                  <Pressable onPress={()=> {navigation.navigate("CommunityPostQuestion",{question : question})}}>
                    <View>
                      <View style={{width: SIZE}} key={question.id}>
                        <View style={styles.imageContainer}>
                          <Text key={question.id}> {question.title} </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                )
                }
              })}
        <Button
            title="Ask a Question"
            onPress={()=> {navigation.navigate("AskQuestion")}}
        />
      </SafeAreaView>
    </ScrollView>
  )
}

function intersection(a, b)
{
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
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

