import { Text, View, TextInput, Button, StyleSheet, ScrollView, Pressable, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.full}>
      <View style={{height: 750, backgroundColor: '#EAE0D5'}}>
      <Text style={styles.communityText}>Ask a Question:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder='Ask away!'
      />
      <Text style={{marginLeft: 15, marginBottom: 0, fontWeight:'bold'}}>Description:</Text>
      <TextInput
        style={styles.longInput}
        onChangeText={setBody}
        value={body}
        multiline={true}
      />
      <Text style={{marginLeft: 15, marginBottom: 10, fontWeight:'bold'}}>Add a tag to your question:</Text>
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
  },
  longInput: {
    height: 200,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  pressedTags: {
      margin:4,
      color: 'gray',
  },
  unpressedTags: {
      margin:4,
      color: 'black',
  },
  ask: {
    width: 250,
    marginLeft: 68,
    borderRadius: 20,
    backgroundColor: '#94a817',
    marginBottom: 260,
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
  height: 400,
},

});

export default AskQuestion;

