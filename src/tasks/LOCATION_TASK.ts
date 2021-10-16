import * as TaskManager from "expo-task-manager";
import { useContext } from "react";
import { LocationContext } from "../contexts/location";


export const LOCATION_TASK = 'background-location-task'
TaskManager.defineTask('background-location-task', 
( {data, error}) => {
    if (error) {
        console.error(error.message)
        // Error occurred - check `error.message` for more details.
        return;
  }
  if (data) {
    const { locations }  = data as any;
    let counter:number = 0
    console.log(JSON.stringify(locations))
  }});
