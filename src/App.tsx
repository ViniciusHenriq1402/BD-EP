import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';

import Routes from './routes/index';
import { AuthProvider } from "./contexts/auth";
import Mapas from './pages/map/Map';

export default function App() {
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
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

