import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import { FAB } from "react-native-paper";
import { mapasProp } from "../../routes/params/AppStackParams";



const Mapas: React.FC = () =>{
  const navigation = useNavigation<mapasProp>()
  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <MapView style={ styles.map }/>
      <FAB
      style={styles.fab}
      icon="plus"
      onPress={() => navigation.navigate("Details", {showModal: true})}
      />

    </View>
    
  )
} 
export default Mapas;

const styles = StyleSheet.create({
  
  map: {
    flex:1
  },
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
  
});
