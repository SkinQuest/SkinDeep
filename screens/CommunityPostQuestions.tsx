import { Text, View, TextInput, StyleSheet, SafeAreaView, Button, useWindowDimensions, ScrollView, Pressable } from 'react-native';
import React from 'react';
import db from '../firebase/config'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import TagButton from "../components/TagButton"

const CommunityPostQuestion = ({route}) => {
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
          const querySnapshot = await getDocs(collection(db, "CommunityQuestionsResponses"));
          querySnapshot.forEach((doc) => {
            newResponses.push(doc.data());
          });
          setResponses(newResponses);
        }
        fetchResponses()
    }, []);

    return (
        <SafeAreaView style={styles.full}>
                        <ScrollView>
            <View style={styles.communityView}>
                <Text style={styles.communityText}>{question.title}</Text>
                <Text style={{marginTop: 10, fontSize: 18}}>{question.body}</Text>
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
                        postUserResponse(body, question.title)
                        setBody("");
                    }}
                    title="Submit"
                    color="white"
                />
                </View>
            </View>

            {/* ANSWERS AND RESPONSES */}

            {responses.map((response)=>
            {
                if (response.questionTitle == question.title)
                {
                    return(
                        <View style={{width: SIZE}} key={response.id}>
                            <Text style={{marginLeft: 20, marginTop: 26, fontWeight:'bold'}}>Comments:</Text>
                            <View style={styles.imageContainer}>
                                <Text style={styles.cardText} key={response.id}>  {response.body} </Text>
                            </View>
                        </View>)
                }   
            }
            )}
            </ScrollView>
        </SafeAreaView>
    );
};

async function postUserResponse(postBody, title) {
    try {
      const docRef = await addDoc(collection(db, "CommunityQuestionsResponses"), {
        body: postBody,
        questionTitle: title,
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
        borderWidth: 2,
        padding: 20,
        borderRadius: 20,
        fontSize: 18
      },
    imageContainer: {
        borderRadius: 34,
        overflow: 'hidden',
        backgroundColor: '#94a817',
        width: 365,
        height: 100,
        margin: 10,
        opacity: 0.5,
        marginTop: 40
    },
    cardText: {
        fontSize: 25,
        color: 'white',
        padding: 10,
        marginLeft: 15 
    },
    row: {
        flexDirection: 'row',
    },
    full:{
        backgroundColor: '#EAE0D5',
        height: 800,
    },
    ask: {
        width: 250,
        marginLeft: 68,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#94a817'
    },
    communityView: {
        margin: 10,
        padding: 10,
    },
    communityText: {
        fontSize: 35,
        fontWeight: 'bold',
    },
});

  

export default CommunityPostQuestion;