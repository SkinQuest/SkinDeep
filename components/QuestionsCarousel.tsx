import { View, Pressable, Text, useWindowDimensions, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'

const QuestionsCarousel = ({data}) => {
    const {width} = useWindowDimensions();
    const SIZE = width * 0.7;
    const SPACER = (width - SIZE) / 2;
  
    return (
      <View>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}>
          <Text>
            {data.map((question, index) => {
                if(!question){
                    return (
                        <View style={{width: SPACER}} key={index}/>
                    );
                }
                return (
                // <Pressable onPress={pressFunction}> 
                  <View style={{width: SIZE}} key={index}>
                      <View style={styles.imageContainer}>
                          <Text style={styles.cardText}> {question.title} </Text>
                          <Text> {question.body} </Text>
                      </View>
                  </View>
                // <Pressable/>
                );
            })};
          </Text>
        </ScrollView>
      </View>
    );
  };

export default QuestionsCarousel

const styles = StyleSheet.create({
    imageContainer: {
      borderRadius: 34,
      overflow: 'hidden',
      backgroundColor: 'blue',
      width: 300,
      height: 200,
    },
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
    },
    cardText: {
       fontSize: 30,
       padding: 10,
       marginLeft: 20 
    }
});