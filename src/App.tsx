import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  Platform, SafeAreaView, StyleSheet } from 'react-native';

import Routes from './routes/index';
import { AuthProvider } from "./contexts/auth";

export default function App() {
  //NOTE: SafeAreaView nao compativel com android?

  return (
    <SafeAreaView style={styles.container}>

      <NavigationContainer>
        <AuthProvider>
         
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
  
 
});

