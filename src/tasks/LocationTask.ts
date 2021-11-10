import * as TaskManager from "expo-task-manager";
import Location from "expo-location"
import { addLocation } from "../services/location/storeLocation";
import api from "../services/api";
import axios from "axios";


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
      const article = { title: 'Axios POST Request Example' };
      axios.post('https://webhook.site/ce8cd931-b67f-494d-a8b2-77e28122b98e', article);
      // have to add it sequentially, parses/serializes existing JSON
      for (const location of locations) {
        await addLocation(location);
      }
    } catch (error) {
      console.log('[tracking]', 'Something went wrong when saving a new location...', error);
    }
  }});

