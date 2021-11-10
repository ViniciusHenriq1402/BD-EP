import * as Location from 'expo-location';
import { useState, useCallback, useEffect } from 'react';
import { LOCATION_TASK } from '../../tasks/LocationTask';
import * as Storage from './storeLocation'

async function isTrackingLocation(): Promise<boolean>{
    return await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
}

async function stopTracking(){
    await Location.stopLocationUpdatesAsync(LOCATION_TASK);
}

async function startTracking() {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    await Location.enableNetworkProviderAsync().then().catch(_ => null);
    
      if (status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 10 * 1000,
          // android behavior
          foregroundService: {
            notificationTitle: 'tatatatataa',
            notificationBody: 'notificacaooooo',
            notificationColor: '#333333',
          },
          
        });
    }
}


export function useLocationTracking() {
    const [isTracking, setIsTracking] = useState<boolean>();
  
    const onStartTracking = useCallback(async () => {
      await startTracking();
      console.log('[tracking]', "inicio monitoramento")
      setIsTracking(true);
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
      }, [isTracking]);
  
    useEffect(() => {
      isTrackingLocation().then(setIsTracking);
    }, []);
  
    return {
      isTracking,
      startTracking: onStartTracking,
      stopTracking: onStopTracking,
      clearTracking: onClearTracking,
    };
  }