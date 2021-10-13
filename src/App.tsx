import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Routes from './routes/index';
import { AuthProvider } from "./contexts/auth";
import MapView from 'react-native-maps';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>

      <NavigationContainer>
        <AuthProvider>
          <Routes />
          <MapView style={styles.map} />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
