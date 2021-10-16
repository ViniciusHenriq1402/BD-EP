import React from "react";
import { LocationObject } from "expo-location";
import { View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { FAB } from "react-native-paper";
import { mapasProps } from "../../routes/params/AppStackParams";



const Mapas: React.FC<mapasProps> = ( {navigation, route} ) =>{

  const [location, setLocation] = React.useState<LocationObject>()

  //testando useMemo
  React.useMemo(() => {
    (location)?console.log(location.coords):console.log("nao definido")
  }, [location])

  //testando useeffect
  React.useEffect(() => {
    setLocation(route.params?.locations)
  })
  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <MapView style={ styles.map }>
        {(location) ? <Marker coordinate={{latitude:location.coords.latitude, longitude:location.coords.longitude}} title="teste" description="descricao"/> :undefined}
        
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
