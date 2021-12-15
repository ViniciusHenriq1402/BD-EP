import React from "react";
import { LocationObject } from "expo-location";
import { View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { FAB } from "react-native-paper";
import { mapasProps } from "../../routes/params/AppStackParams";
import { issick } from "../../services/api";
import { useLocationTracking } from "../../services/location/useLocation";
import { getLocations } from "../../services/location/storeLocation";



const Mapas: React.FC<mapasProps> = ( {navigation, route} ) =>{

  const [locations, setLocations] = React.useState<LocationObject[]>();

  const locationTrack = useLocationTracking();

   //testando useeffect
 /*  React.useEffect(() => {
    atualizaMarcador()
  })

  const atualizaMarcador = async () => {
      setLocations(await getLocations())
  } */
  
 

   React.useEffect( () => {
     /*  const interval = setInterval(async () => {
      const response = await issick();
      console.log( "resposta " + response);
    }, 100000) */
      
      locationTrack.startTracking();
      
    /* return () => {
      clearInterval(interval)
    } */
  }, []) 

  
 
  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <MapView  style={{flex:1}} >
        {(locations)? locations.map((local) =>
        <Marker key={local.timestamp} coordinate={{latitude:local.coords.latitude, longitude:local.coords.longitude}} /> )
        : <></>}
      </MapView>
      <FAB
      style={styles.fab}
      icon="plus"
      onPress={() => {navigation.navigate("Details" ); }}
      />

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
  
});
