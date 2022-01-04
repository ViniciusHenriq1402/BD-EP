import { api, source } from "./api";

export async function postUserLocation(
    token:string, latitude:number, longitude:number, timestamp:string) {
    const response = await api.post<string>(`/User/${token}/locations`, {
      token: token,
      lat: latitude,
      long: longitude,
      datetime: timestamp
    }, {cancelToken: source.token})
    .then(response => response.data)
    .catch(error => console.log(error))
    .finally( () => console.log("[api] post user location")) 
  }


/*   export async function getLocation( token: string, latitude:number, longitude:number) {
    const response = await api.post('/posicao', {
      lat: latitude,
      lon: longitude
    }, {headers: {token: token}} )
    .then(response => response.data)
    .catch(error => console.log(error))
  
    console.log( `[api] get location lat ${latitude} e long ${longitude}` );
     
  } */