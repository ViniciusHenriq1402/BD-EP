import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import * as Location from 'expo-location';
import { LocationObject } from "expo-location";

import { detailsProps } from "../routes/params/AppStackParams";
import { useAuth } from "../contexts/auth";

import { useLocationTracking } from "../services/location/useLocation";




const Details: React.FC<detailsProps> = ({navigation, route}) =>{
  
  const { signOut } = useAuth()

  const [isVisible, setIsVisible] = React.useState(navigation.isFocused);
  const [location, setLocation] = React.useState<LocationObject>();

  const locations = useLocationTracking();


  function handleSignOut() {
   if (locations.isTracking) {
    locations.stopTracking();
    locations.clearTracking();
   } 
    signOut()
  }

  /* function clear() {
    (locations.isTracking) ? locations.clearTracking(): undefined;
  } */

  return (
      <Portal>
        <Modal visible={isVisible}
            contentContainerStyle={styles.modalContainer}
            onDismiss={() => {navigation.navigate("Mapas", {locations: location} ); setIsVisible(false);}}>
          <Text style={{fontSize: 50}}>DETALHES</Text>
          <View style={{marginVertical: 5, padding: 10, borderRadius: 10, width: '40%'}}>
              
          </View>
            <Text style={{ fontSize:16, fontWeight:"bold" }}>Latitude: {location?.coords.latitude} </Text>
            <Text style={{ fontSize:16, fontWeight:"bold" }}>Longitude: {location?.coords.longitude} </Text>
          {/* <View style={{marginVertical: 5, padding: 10, borderRadius: 10,}}>
            <Button mode="contained" onPress={requestPermission}>Start background update</Button>
          </View>
            <Text style={{ fontSize:16, fontWeight:"bold" }}>BGlatitude: {locationBG?.coords.latitude} </Text>
            <Text style={{ fontSize:16, fontWeight:"bold" }}>BGlongitude: {locationBG?.coords.longitude} </Text> */}
          <View style={{marginVertical: 5, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent:"center"}}>
            <Button mode="contained" onPress={handleSignOut}>Sign out</Button>
          </View>
        </Modal>
      </Portal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 18, 
        backgroundColor:"white",
        justifyContent: "center",
        marginHorizontal: 16,
        alignItems:"center"
      },
      
})

export default Details;

