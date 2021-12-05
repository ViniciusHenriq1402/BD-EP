import React from "react";
import { LocationObject } from "expo-location";
import { View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { FAB } from "react-native-paper";
import { mapasProps } from "../../routes/params/AppStackParams";
import { getLocations } from "../../services/location/storeLocation";
import api, { issick } from "../../services/api";



const Mapas: React.FC<mapasProps> = ( {navigation, route} ) =>{

  const [location, setLocation] = React.useState<LocationObject>();
  const [locations, setLocations] = React.useState<LocationObject[]>();

 /*  //testando useeffect
  React.useEffect(() => {
    setLocation(route.params?.locations)
    atualizaMarcador()
  })

  const atualizaMarcador = React.useCallback(
   async () => {
      setLocations(await getLocations())
    },
    [],
  ) */

  React.useEffect( () => {
    const interval = setInterval(async () => {
      const response = await issick();
      console.log( "resposta " + response);
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
 
  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <MapView style={ styles.map }>
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
  
  map: {
    flex:1
  },
  fab: {
    position: 'absolute',
    margin: 24,
    left: 0,
    bottom: 0,
  },
  
});
