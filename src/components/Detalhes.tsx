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

  const [errorMsg, setErrorMsg] = React.useState("");

  const locations = useLocationTracking();

   const getLocation =  async () => {
    /* Note: Foreground permissions should be granted before asking for the background 
    permissions (your app can't obtain background permission without foreground permission) */
      let foregroundPermission= await Location.requestForegroundPermissionsAsync();

      if (foregroundPermission.status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else {
        
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let backgroundPermission = await Location.requestBackgroundPermissionsAsync();
        if (backgroundPermission.status !== 'granted') {
          setErrorMsg('Permission to access background location was denied');
          return;
        } else {
          locations.startTracking();
        }
      }
    }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function handleSignOut() {
   if (locations.isTracking) {
    locations.stopTracking();
    locations.clearTracking();
   } 
    signOut()
  }

  function clear() {
    (locations.isTracking) ? locations.clearTracking(): undefined;
  }

  return (
      <Portal>
        <Modal visible={isVisible}
            contentContainerStyle={styles.modalContainer}
            onDismiss={() => {navigation.navigate("Mapas", {locations: location} ); setIsVisible(false);}}>
          <Text style={{fontSize: 50}}>DETALHES</Text>
          <View style={{marginVertical: 5, padding: 10, borderRadius: 10, width: '40%'}}>
              <Button 
              mode="contained" onPress={getLocation} 
              >Get Location</Button>
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
            <Button mode="contained" onPress={clear}>Clear Storage</Button>
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

