import { Text, View, TextInput, StyleSheet, SafeAreaView, Button } from 'react-native';
import React from 'react';
import db from '../firebase/config'
import { collection, addDoc } from "firebase/firestore"; 

import { UserContext } from '../components/UserContext';


const CompanyPostQuestion = ({route}) => {

    const {question} = route.params;
    const [body, setBody] = React.useState();

    const { value } = React.useContext(UserContext);

    return (
        <SafeAreaView>
            <View>
                <Text>{question.body}</Text>
                <Text>{"User Email:" + value}</Text>
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

async function postUserResponse (postBody) {
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
  })

export default CompanyPostQuestion;