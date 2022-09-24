import React, { useCallback, useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View , Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/logo_utn_icon.png');

export function AnimatedSplashScreen(){
    /*state = {
      opacity: new Animated.Value(0),
    }*/

    const [opacity, setOpacity] = useState(new Animated.Value(0));
    const navigation = useNavigation();
    
    const onLoad = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            navigation.navigate('Login');
        }, 5000);
    }
  
      return (
        <View style={styles.container}>
            <Animated.Image
                onLoad={onLoad}
                source={image}
                style={[
                {
                opacity: opacity,
                transform: [
                    {
                    scale: opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.85, 1],
                    })
                    },
                ],
                },
                styles.image,
            ]}
            />
        </View>
      );
    }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 500,
      height: 500,
      borderRadius: 10,
    },
  });