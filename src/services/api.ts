import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

interface disease {
    id: string;
    name: string;
    contagious: boolean
}

const api = axios.create({
  baseURL: 'http://18.117.176.243:2000'
  //emulador
  //baseURL: 'http://10.0.2.2:8080',
  //fisico
  //baseURL: 'http://192.168.15.11:8080',

});

export async function postUser(
  name: string, pw: string, email: string, document: string){
    const response = await api.post( '/User', {
      name:name,
      password:pw,
      email:email,
      document:document
    }, )
    .then(response => response.data)
    .catch(reason => console.log('[api] post User', reason))
    return response
  }

export async function postUserLogin( cpf:string, pw:string ) : Promise<string | void>{
  const response = await api.post('/User/login', {
    document: cpf, password: pw
  }, )
  .then(response => response.data)
  .catch(error => console.log(error))
  
  console.log(`[api] login com ${cpf} e ${pw}`);
 
}

export async function getLocation( token: string, latitude:number, longitude:number) {
  const response = await api.post('/posicao', {
    lat: latitude,
    lon: longitude
  }, {headers: {token: token}} )
  .then(response => response.data)
  .catch(error => console.log(error))

  console.log( `[api] get location lat ${latitude} e long ${longitude}` );
   
}

//
export async function getDisease(token:string): Promise<string[]>{
  const response = await api.get<disease[]>('/Disease', {headers:{token:token}})
  .then(response => response.data.map( (disease) => disease.name))
  .catch(reason => console.log('[api] getDisease', reason))
  if(!!response) return response
  return []
  
}


export async function postUserLocation(
  token:string, latitude:number, longitude:number, timestamp:number) {
  const response = await api.post<string>(`/User/${token}/locations`, {
    token: token,
    lat: latitude,
    long: longitude,
    datetime: timestamp
  }, {cancelToken: source.token})
  .then(response => response.data)
  .catch(error => console.log(error))
}

export async function postUserDisease(
  token:string, ShowSymptoms :boolean, startDate:string, DiseaseName:string ){
  const response = await api.post(`/User/${token}/diseases`, {
    ShowSymptoms : ShowSymptoms , startDate: startDate, DiseaseName:DiseaseName
  }, {headers:{token:token}})
  .then(response => response.data)
  .catch(error => console.log(error))
  
}



 export async function issick(): Promise<string | void> {
  const token = await AsyncStorage.getItem('@RNAuth:token') 
  const response = await api.get<string>('/issick', {
    params: {
      token: token
    },
    cancelToken: source.token
  }, )
  .then(response => response.data)
  .catch(error => console.log(error));

  console.log( "[api] issick com token " + token );
  
  return response;
}
