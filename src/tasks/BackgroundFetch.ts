import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from 'expo-background-fetch';
import { issick } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const BACKGROUND_FETCH_TASK = "background-fetch-issick"

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

    //dados da resposta do backend
    //pode ser void ou string
    const response = await issick();

    console.log( "[api] issick background " + response);
    
    // return pra onde?
    if(BackgroundFetch.Result.NewData && response) await AsyncStorage.setItem('@Api:issick', response)
    return response ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;

  });

  export async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval:  0.5, // minutes
      
    });
  }

 export async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }

  export async function getStatusBGAsync(){
    const status = await BackgroundFetch.getStatusAsync()
    return status;
    
  }