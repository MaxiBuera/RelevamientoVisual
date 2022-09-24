import React, { useCallback, useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View , Animated} from 'react-native';
import { HomeScreen } from './src/HomeScreen';
import { LoginScreen } from './src/LoginScreen';
import { AnimatedSplashScreen } from './src/AnimatedSplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
// PASSWORD: pruebaapp

useEffect(() => {
  async function prepare() {
    try {
          // Pre-load fonts, make any API calls you need to do here
          await Font.loadAsync(Entypo.font);
          // Artificially delay for two seconds to simulate a slow loading experience
          await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
          console.warn(e);
      } finally {
          // Tell the application to render
          setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

/*const navigation = useNavigation();*/
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName ='Splash' screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name = 'Splash' component={AnimatedSplashScreen} />
        <Stack.Screen name = 'Login' component={LoginScreen} />
        <Stack.Screen name = 'Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
