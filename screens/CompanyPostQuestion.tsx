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
        <SafeAreaView>
            <View>
                <Text>{question.title}</Text>
            </View>
            <View>
            <TextInput
            style={styles.longInput}
            onChangeText={setBody}
            value={body}
            multiline={true}
            />
            <Button
            onPress={() => {
                postUserResponse(body)
                setBody("");
            }}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
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
        borderWidth: 1,
        padding: 10,
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
  });

  

export default CompanyPostQuestion;