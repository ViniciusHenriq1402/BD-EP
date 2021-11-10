import * as TaskManager from "expo-task-manager";
import Location from "expo-location"
import { addLocation } from "../services/location/storeLocation";


export const LOCATION_TASK = 'background-location-task'

TaskManager.defineTask('background-location-task', async( event ) => {
    if (event.error) {
        console.error(event.error.message)
        // Error occurred - check `error.message` for more details.
        return;
  }
  if (event.data) {
    const locations = (event.data as any).locations as Location.LocationObject[];
    console.log("monitorando localizacao", locations);
    try {
      // have to add it sequentially, parses/serializes existing JSON
      for (const location of locations) {
        await addLocation(location);
      }
    } catch (error) {
      console.log('[tracking]', 'Something went wrong when saving a new location...', error);
    }
  }});

