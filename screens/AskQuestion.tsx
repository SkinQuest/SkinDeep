import { Text, View, TextInput, Button, StyleSheet, ScrollView, Pressable, SafeAreaView, KeyboardAvoidingView } from 'react-native';
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
      "Contact Dermatitis":false,
      "Alopecia":false
  });

  return (
    <KeyboardAvoidingView>
    <SafeAreaView style={styles.full}>
      <View style={{height: 750, backgroundColor: '#EAE0D5'}}>
      <Text style={styles.communityText}>Ask a Question:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder='Ask away!'
        placeholderTextColor='black'
      />
      <Text style={{marginLeft: 15, marginBottom: 0, fontWeight:'bold', fontSize:16, marginTop: 10}}>Description:</Text>
      <TextInput
        style={styles.shortInput}
        onChangeText={setBody}
        value={body}
        multiline={true}
      />
      <Text style={{marginLeft: 15, marginBottom: 10, fontWeight:'bold', fontSize: 16, marginTop: 10}}>Add a tag to your question:</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.row}>
          {Object.keys(tagSelections).map((tag)=>
              <Pressable onPress={()=> setTagSelections((previous)=>({...previous, [tag]:!previous[tag]}))}>
                  <Text style={tagSelections[tag] ? styles.unpressedTags : styles.pressedTags}>{tag}</Text>
              </Pressable>
          )}
      </ScrollView>
      <View style={styles.ask}>
        <Button
        onPress={() => {
          postQuestion(title, body, Object.keys(tagSelections).filter((tag)=>tagSelections[tag]));
          setTitle("");
          setBody("");
        }}
        title="Post Question"
        color="white"
        accessibilityLabel="Learn more about this purple button"
      />
      </View>
      
      </View>

    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

async function postQuestion (postTitle, postBody, tags) {
  try {
    const docRef = await addDoc(collection(db, "Questions"), {
      title: postTitle,
      body: postBody,
      tags: tags,
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
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  shortInput: {
    height: 100,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    opacity: 0.5
  },
  pressedTags: {
      margin:8,
      color: 'gray',
      fontSize: 16,
  },
  unpressedTags: {
      margin:4,
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold'
  },
  ask: {
    width: 250,
    marginLeft: 68,
    borderRadius: 20,
    backgroundColor: '#94a817',
    marginBottom: 330,
},
communityView: {
  margin: 10,
  padding: 10,
},
communityText: {
  fontSize: 30,
  fontWeight: 'bold',
  marginLeft: 8,
  margin: 10,
  marginBottom: -5,
  padding: 10,
}, 
full:{
  backgroundColor: '#F2E3BC',
  height: 900,
},
row: {
  marginLeft: 10,
  fontSize: 16,
}

});

export default AskQuestion;

