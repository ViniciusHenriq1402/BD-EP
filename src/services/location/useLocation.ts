import { useState, useCallback, useEffect } from 'react';
import { isTrackingLocation, startTracking, stopTracking } from '.';
import * as Storage from './storeLocation'

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