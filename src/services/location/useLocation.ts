import { useState, useCallback, useEffect } from 'react';
import { isTrackingLocation, startTracking, stopTracking } from '.';
import * as Storage from './storeLocation'
import * as TaskManager from "expo-task-manager";
import { LocationObject } from 'expo-location';
import { posicao } from '../api';


export const LOCATION_TASK = 'background-location-task'

export function useLocationTracking() {
  
  const [locations, setLocations] = useState<LocationObject[]>([]);
  const [isTracking, setIsTracking] = useState<boolean>();
  
  const onStartTracking = useCallback(async () => {
    await startTracking();
    console.log('[tracking]', "inicio monitoramento")
    setIsTracking(true);
    Storage.getLocations().then((array)=>setLocations(array));

  }, []);

  const onStopTracking = useCallback(async () => {
    await stopTracking();
    console.log ("[tracking]","monitoramento parou")
    setIsTracking(false);
  }, []);

  const onClearTracking = useCallback(async () => {
    if (isTracking) {
      await onStopTracking();
    }
    await Storage.clearLocations();
    
    }, [isTracking, locations]);

  useEffect(() => {
    isTrackingLocation().then(setIsTracking)
    console.log('effect do useLocation')
    TaskManager.defineTask(LOCATION_TASK, async( { data: locationsArr , error } ) => {
      if (error) {
            console.error(error.message)
            // Error occurred - check `error.message` for more details.
            return;
      }
      if (locationsArr) {
        //locations eh LocationObjetct[]
        //{loc: [{"locations":["coords":[object], "timestamp": integer]}]}
        const location = Object.values(locationsArr)[0][0] as LocationObject;
        Storage.addLocation(location)
        const arr = locations
        
        if(locations.length > 10 ){
          arr.shift()
          arr.push(location)
        } else {
          arr.push(location)

        }
        setLocations(arr)
        const response = await posicao(location.coords.latitude, location.coords.longitude);
    
      }
    })
    return () => {
      if (isTracking) {
        onStopTracking();
        
        TaskManager.unregisterAllTasksAsync()
        console.log('cleanup useEffect')
      }
    }
  }, []);

  return {
    locations,
    isTracking,
    startTracking: onStartTracking,
    stopTracking: onStopTracking,
    clearTracking: onClearTracking,
  };
}