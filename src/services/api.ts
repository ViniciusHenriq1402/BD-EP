import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  //emulador
  //baseURL: 'http://10.0.2.2:8080',
  
  baseURL: 'http://192.168.15.11:8080',

});

/**
 * signIn POST para /login
 * response == token:string
 * chamado em context/auth.tsx
 * 
 * posicao POST para /posicao
 * response == unknown | void
 * chamado em tasks/LocationTask.ts
 *
 * 
 * issick GET para /issick?token=token
 * response == verificar
 * chamado em tasks/BackgroundFetch.ts 
 * 
 */

//POST http://HOST[:PORT]/login
export async function signIn(): Promise<string|void>{
  const response = await api.post<string>('/login', {
    user: "tony", password: "batata"
}).then(response => response.data)
.catch(error => console.log(error))
  
  return response;
  
}

//GET http://HOST[:PORT]/issick?token={token}
export async function issick(): Promise<string | void> {
  const token = await AsyncStorage.getItem('@RNAuth:token') 
  const response = await api.get<string>('/issick', {
    params: {
      token: token
    }
  })
  .then(response => response.data)
  .catch(error => console.log(error));

  return response;
}

//POST http://HOST[:PORT]/posicao
export async function posicao(latitude:number, longitude:number) {
  const token = await AsyncStorage.getItem('@RNAuth:token') 
  const response = await api.post('/posicao', {
    token: token,
    lat: latitude,
    lon: longitude
  })
  .catch(error => console.log(error))

}

export default api;

