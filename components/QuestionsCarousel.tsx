import { View, Text, useWindowDimensions, StyleSheet, ScrollView, Image } from 'react-native'
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
            {data.map((item, index) => {
                if(!item.image){
                    return (
                        <View style={{width: SPACER}} key={index}/>
                    );
                }
                return (
                <View style={{width: SIZE}} key={index}>
                    <View style={styles.imageContainer}>
                        <Image source={item.image} style={styles.image} />
                    </View>
                </View>
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
    },
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
    },
});