import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import * as Location from 'expo-location';
import { LocationObject } from "expo-location";

import { detailsProps } from "../routes/params/AppStackParams";
import { useAuth } from "../contexts/auth";
import {LOCATION_TASK} from "../tasks/LOCATION_TASK";
import AsyncStorage from "@react-native-async-storage/async-storage";




const Details: React.FC<detailsProps> = ({navigation, route}) =>{
  
  const { signOut } = useAuth()

  const [isVisible, setIsVisible] = React.useState(navigation.isFocused);
  const [location, setLocation] = React.useState<LocationObject>();

  const [locationBG, setLocationBG] = React.useState<LocationObject>();
  const [errorMsg, setErrorMsg] = React.useState("");


  const getLocation = React.useCallback ( async () => {

    const { signed } = useAuth()
    React.useMemo(() => {(signed) ? null: Location.stopLocationUpdatesAsync(LOCATION_TASK)},[signed])
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }, [])

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function handleSignOut() {
    Location.stopLocationUpdatesAsync(LOCATION_TASK);
    signOut()
  }

  function stopUpdate() {
    Location.stopLocationUpdatesAsync(LOCATION_TASK);
  }


  const requestPermission = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    await AsyncStorage.setItem('@RNPermission:string', status)
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 20
      });
  }}


  return (
    <>
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
            <View style={{marginVertical: 5, padding: 10, borderRadius: 10,}}>
              <Button mode="contained" onPress={requestPermission}>Start background update</Button>
            </View>
            <Text style={{ fontSize:16, fontWeight:"bold" }}>BGlatitude: {locationBG?.coords.latitude} </Text>
            <Text style={{ fontSize:16, fontWeight:"bold" }}>BGlongitude: {locationBG?.coords.longitude} </Text>
            <View style={{marginVertical: 5, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent:"center"}}>
            <Button mode="contained" onPress={handleSignOut}>Sign out</Button>
            <Button mode="contained" onPress={stopUpdate}>Stop update</Button>
            </View>
          </Modal>
      </Portal>
    </>
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

