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

    const [tagSelections, setTagSelections] = React.useState<{[key: string]:boolean}>({
        "Eczema":false, 
        "Acne":false,
        "Psoriasis":false,
        "Rosacea":false,
        "Contact":false,
        "Dermatitis":false,
        "Alopecia":false
    });

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
        <SafeAreaView>
            <View>
                <Text>{question.title}</Text>
                <Text>{question.body}</Text>
            </View>
            <View>
                <TextInput
                    style={styles.longInput}
                    onChangeText={setBody}
                    value={body}
                    multiline={true}
                />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.row}>
                    {Object.keys(tagSelections).map((tag)=>
                        <Pressable onPress={()=> setTagSelections((previous)=>({...previous, [tag]:!previous[tag]}))}>
                            <Text style={tagSelections[tag] ? styles.unpressedTags : styles.pressedTags}>{tag}</Text>
                        </Pressable>
                    )}
                </ScrollView>
                <Button
                    onPress={() => {
                        postUserResponse(body, question.title)
                        setBody("");
                    }}
                    title="Submit"
                    color="#841584"
                />
            </View>

            {/* ANSWERS AND RESPONSES */}

            <ScrollView>
            {responses.map((response)=>
            {
                if (response.questionTitle == question.title)
                {
                    return(
                        <View style={{width: SIZE}} key={response.id}>
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
    },
    row: {
        flexDirection: 'row',
    },
    pressedTags: {
        margin:4,
        color: 'red',
    },
    unpressedTags: {
        margin:4,
        colore: 'blue',
    }
});

  

export default CommunityPostQuestion;