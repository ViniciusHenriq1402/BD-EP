import axios from 'axios';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

export const api = axios.create({
  baseURL: 'http://18.117.176.243:2000'
  //emulador
  //baseURL: 'http://10.0.2.2:8080',
  //fisico
  //baseURL: 'http://192.168.15.11:8080',

});

 export async function issick(token:string): Promise<boolean | void> {
  /* const response = await api.get<boolean>('/issick', {
    params: {
      token: token
    },
    cancelToken: source.token,
    headers:{
      token: token
    }
  })
  .then(response => response.data)
  .catch(error => console.log()); */

  return false;
}
