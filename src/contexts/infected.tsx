import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationObject } from "expo-location";
import React, { createContext } from "react";
import * as api from "../services/api";
import { useLocationTracking } from "../services/location/useLocation";
import { useAuth } from "./auth";


interface InfectedContextData {

    locationTrack: {
        locations: LocationObject[];
        isTracking: boolean | undefined;
        startTracking: () => Promise<void>;
        stopTracking: () => Promise<void>;
        clearTracking: () => Promise<void>;
    };
    handleSignOut(): void;

} 

const InfectedContext = createContext<InfectedContextData>({} as InfectedContextData);

const InfectedProvider: React.FC = ({ children }) => {
  
  const { signOut } = useAuth() 

  const locationTrack = useLocationTracking();

  /* issick
  React.useEffect( () => {
  const interval = setInterval(async () => {
      const response = await api.issick();
      if(response) alert(response)
  }, 10000) 
  return () => {
      clearInterval(interval)  
  } 
  })  
  */
  React.useEffect( () => {
    locationTrack.startTracking();
  },[])
  

  const handleSignOut = () => {
      if (locationTrack.isTracking) {
        locationTrack.stopTracking()
        .catch( (reason) => console.log(reason) ) ;
      } 
      locationTrack.clearTracking()
      .catch( (reason) => console.log(reason) );
      signOut();
  }

  return (
  <InfectedContext.Provider value={{ locationTrack, handleSignOut }}>
      {children}
  </InfectedContext.Provider>
  );
};

function useInfected() {

  const context = React.useContext(InfectedContext);

  if (!context) {
    throw new Error('useInfected must be used within an InfectedProvider.');
  }

  return context;
}

export {InfectedProvider, useInfected};
