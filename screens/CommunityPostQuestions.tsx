import { Text, View, TextInput, StyleSheet, SafeAreaView, Button, useWindowDimensions, ScrollView, Pressable, KeyboardAvoidingView } from 'react-native';
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
    async function fetchResponses()
    {
      var newResponses = []
      const querySnapshot = await getDocs(collection(db, "CommunityQuestionsResponses"));
      querySnapshot.forEach((doc) => {
        newResponses.push(doc.data());
      });
      setResponses(newResponses);
    }

    React.useEffect(() => {
        // Fetch questions from firebase
        fetchResponses()
    }, []);

    return (
        <KeyboardAvoidingView>
        <SafeAreaView style={styles.full}>
                        <ScrollView>
            <View style={styles.communityView}>
                <Text style={{opacity: 0.3, fontSize: 16, marginBottom: 5, marginTop: 10}}>Question</Text>
                <Text style={styles.communityText}>{question.title}</Text>
                <Text style={{opacity: 0.3, fontSize: 16, marginTop: 13,}}>Description</Text>
                <Text style={{marginTop: 10, fontSize: 22}}>{question.body}</Text>
            </View>
            <View>
            <Text style={{marginTop: 25,marginLeft: 20, marginBottom: 0, fontWeight:'bold', fontSize: 16}}>Response:</Text>
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
                        fetchResponses();
                    }}
                    title="Submit"
                    color="white"
                />
                </View>
            </View>

            {/* ANSWERS AND RESPONSES */}
            <Text style={{marginLeft: 20, marginTop: 26, fontWeight:'bold', fontSize: 16}}>Comments:</Text>

            {responses.map((response)=>
            {
                if (response.questionTitle == question.title)
                {
                    return(
                        <View style={{width: SIZE}} key={response.id}>
                            <View style={styles.imageContainer}>
                                <View style={styles.lightBord}>
                                <Text style={styles.cardHead}>Anonymous:</Text>
                                <View
                                style={{flexDirection: 'row'}}>
                                    <Text style={styles.cardText} key={response.id}>  {response.body} </Text>
                                </View>
                                </View>
                            </View>
                        </View>)
                }   
            }
            )}
            </ScrollView>
        </SafeAreaView>
        </KeyboardAvoidingView>
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
        fontSize: 18,
        backgroundColor: 'white',
        opacity: 0.5
      },
    imageContainer: {
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: 'white',
        width: 365,
        height: 'auto',
        margin: 10,
        opacity: 0.5,
        marginTop: 30,
        marginLeft: 12
    },
    lightBord: {
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 14,
    },
    cardHead:{
        fontSize: 14,
        marginLeft: 20,
        marginTop: 15,
    },
    cardText: {
        fontSize: 18,
        color: 'black',
        padding: 10, 
        numberOfLines: 2,
        flexShrink: 1
    },
    row: {
        flexDirection: 'row',
    },
    full:{
        backgroundColor: '#EAE0D5',
        height: 'auto',
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