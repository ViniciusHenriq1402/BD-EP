import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  //emulador
  baseURL: 'http://10.0.2.2:8080',
  //fisico
  //baseURL: 'http://192.168.15.11:8080',

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
export async function signIn( cpf:string, pw:string ): Promise<string | void>{
  const response = await api.post<string>('/login', {
    name: cpf, password: pw
  }).then(response => response.data)
  .catch(error => console.log(error))
  
  console.log(`[api] signIn com ${cpf} e ${pw}`);
 
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

  console.log( "[api] issick com token " + token );
  
  return response;
}

//POST http://HOST[:PORT]/posicao
export async function posicao(latitude:number, longitude:number): Promise<string | void> {
  const token = await AsyncStorage.getItem('@RNAuth:token') 
  const response = await api.post<string>('/posicao', {
    token: token,
    lat: latitude,
    lon: longitude
  })
  .then(response => response.data)
  .catch(error => console.log(error))

  console.log( `[api] posicao com latitude ${latitude} e longitude ${longitude}`);
  return response
}

export default api;

