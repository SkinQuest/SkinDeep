import { Text, View, TextInput, Button, StyleSheet, ScrollView, Pressable } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import React from 'react';

import db from '../firebase/config'

const AskQuestion = () => {

  const [title, setTitle] = React.useState();
  const [body, setBody] = React.useState();

  const [tagSelections, setTagSelections] = React.useState<{[key: string]:boolean}>({
      "Eczema":false, 
      "Acne":false,
      "Psoriasis":false,
      "Rosacea":false,
      "Contact":false,
      "Dermatitis":false,
      "Alopecia":false
  });

  return (
    <View>
      <Text>New Question:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />
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
          postQuestion(title, body);
          setTitle("");
          setBody("");
        }}
        title="Post Question"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

async function postQuestion (postTitle, postBody) {
  try {
    const docRef = await addDoc(collection(db, "Questions"), {
      title: postTitle,
      body: postBody,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  longInput: {
    height: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  pressedTags: {
      margin:4,
      color: 'red',
  },
  unpressedTags: {
      margin:4,
      color: 'blue',
  }
});

export default AskQuestion;

