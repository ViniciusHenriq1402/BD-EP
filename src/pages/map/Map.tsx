import React from "react";
import { LocationObject } from "expo-location";
import { View, Text, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { Button, FAB, Modal, Portal } from "react-native-paper";
import { mapasProps } from "../../routes/params/AppStackParams";
import { useLocationTracking } from "../../services/location/useLocation";
import { addLocation, clearLocations, getLocations } from "../../services/location/storeLocation";
import { issick, posicao } from "../../services/api";
import { useAuth } from "../../contexts/auth";




const Mapas: React.FC<mapasProps> = ( {navigation, route} ) =>{

  const [isVisible, setIsVisible] = React.useState(false);
  const locationTrack = useLocationTracking();
  const { signOut } = useAuth()


  React.useEffect( () => {
    if (!locationTrack.isTracking) locationTrack.startTracking();
    const interval = setInterval(async () => {
      const response = await issick();
      console.log('useeffect do map')

    }, 10000) 
    return () => {
      clearInterval(interval)
    } 
  },[locationTrack.isTracking]) 

  function handleSignOut() {
    if (locationTrack.isTracking) {
      locationTrack.stopTracking();
    } 
    locationTrack.clearTracking();
    signOut()
  }
  function clearStorage(){
    locationTrack.clearTracking()
  }
  function consoleLog(){
    console.log('locations tem', locationTrack.locations.length)
  }
  
 
  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <MapView style={{flex:1}} >
        {locationTrack.locations.map((local,index) =>
        <Marker key={index} 
        flat={true} 
        coordinate={{latitude:local.coords.latitude, longitude:local.coords.longitude}} 
        /> )
        }
      </MapView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => { setIsVisible(true) }}
      />
      <Portal>
        <Modal visible={isVisible}
            contentContainerStyle={styles.modalContainer}
            onDismiss={() => {setIsVisible(false)}}>
          <Text style={{fontSize: 50}}>Detalhes</Text>
          <View style={styles.textContainer}>  
          {
            locationTrack.locations.map((location, index) => {return(
              <Text key={index}
              style={{ fontSize: 14 }}>
                Latitude: {location.coords.latitude} Longitude: {location.coords.longitude}
              </Text>     
            )}) 
          }
          </View>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleSignOut}>Sign out</Button>
            <Button mode="contained" onPress={clearStorage}>Clear Storage</Button>
            <Button mode="contained" onPress={consoleLog}>Print</Button>
          </View>
        </Modal>
      </Portal>
    </View>
    
  )
} 
export default Mapas;
//
const styles = StyleSheet.create({
  

  fab: {
    position: 'absolute',
    margin: 24,
    left: 0,
    bottom: 0,
  },
  modalContainer: {
    borderRadius: 18, 
    backgroundColor:"white",
    justifyContent: "center",
    marginHorizontal: 16,
    alignItems:"center"
  },
  buttonContainer: {
    marginVertical: 5, 
    padding: 10, 
    borderRadius: 10, 
    flexDirection: "row", 
  justifyContent:"center"
},
textContainer:{
  flexDirection: 'column',
  marginVertical: 5, 
  padding: 10, 
  borderRadius: 10, 
  width: '90%'
},
  
});
/**<View style={styles.textContainer}>  
          {(locationTrack.locations) ? 
            locationTrack.locations.map((location, index) => {
              <Text key={index}
              style={{ fontSize: 16, fontWeight: "bold" }}>
                Latitude: {location.coords.latitude} 
                Longitude: {location.coords.longitude}
              </Text>     
            }) : <></>
          }
          </View>
           */