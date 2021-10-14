import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import { FAB } from "react-native-paper";



const Mapas: React.FC = () =>{
  return (
    <>
      <MapView style={ styles.map }/>
    </>
  )
} 
export default Mapas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex:1
  },
  
});
