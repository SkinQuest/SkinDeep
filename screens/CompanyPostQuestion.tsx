import { Text, View, TextInput, StyleSheet, SafeAreaView, Button, useWindowDimensions, ScrollView } from 'react-native';
import React from 'react';
import db from '../firebase/config'
import { collection, addDoc, getDocs } from "firebase/firestore"; 

import { UserContext } from '../components/UserContext';


const CompanyPostQuestion = ({route}) => {
    const {width} = useWindowDimensions();
    const SIZE = width * 0.7;
    const {question} = route.params;
    const [body, setBody] = React.useState();
    const [responses, setResponses] = React.useState([]);

    React.useEffect(() => {
        // Fetch questions from firebase
        async function fetchResponses()
        {
          var newResponses = []
          const querySnapshot = await getDocs(collection(db, "CompanyQuestionsResponses"));
          querySnapshot.forEach((doc) => {
            newResponses.push(doc.data());
          });
          setResponses(newResponses);
        }
        fetchResponses()
    }, []);

    return (
        <SafeAreaView style={styles.full}>
            <View style={styles.companyView}>
                <Text style={styles.companyText}>{question.title}</Text>
            </View>
            <View>
            <Text style={{marginLeft: 20, marginBottom: 0, fontWeight:'bold'}}>Response:</Text>
            <TextInput
            style={styles.longInput}
            onChangeText={setBody}
            value={body}
            multiline={true}
            />
            <View style={styles.ask}>
              <Button
              onPress={() => {
                  postUserResponse(body)
                  setBody("");
              }}
              title="Submit"
              color="white"
              accessibilityLabel="Learn more about this purple button"
              />
            </View>
            </View>
        </SafeAreaView>
    );

};

async function postUserResponse(postBody) {
    try {
      const docRef = await addDoc(collection(db, "CompanyQuestionsResponses"), {
        body: postBody,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

const styles =  StyleSheet.create({
    longInput: {
        height: 200,
        margin: 12,
        marginTop: 20,
        borderWidth: 2,
        padding: 20,
        borderRadius: 20,
        fontSize: 18,
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
    ask: {
      width: 250,
      marginLeft: 68,
      borderRadius: 20,
      backgroundColor: '#94a817',
      marginTop: 18,
     },
     companyText: {
      fontSize: 30,
      fontWeight: 'bold',
     },
     companyView: {
      margin: 10,
      padding: 10,
     },
     full:{
      backgroundColor: '#EAE0D5',
      height: 800,
     }
  });

  

export default CompanyPostQuestion;