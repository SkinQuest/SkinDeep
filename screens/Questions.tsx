import { Text, View, Button } from 'react-native';
import React from 'react';

const Questions = ({navigation}) => {


  return (
    <View>
      <Text>Questions</Text>
      <Button
        title="Ask a Question"
        onPress={() =>
          navigation.navigate('AskQuestion')
        }
      />
    </View>
  )
}

async function fetchQuestions()
{

}

export default Questions

