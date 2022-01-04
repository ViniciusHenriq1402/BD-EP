import axios from 'axios';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

export const api = axios.create({
  baseURL: ''
  //emulador
  //baseURL: 'http://10.0.2.2:8080',
  //fisico
  //baseURL: 'http://192.168.15.11:8080',

});

 export async function issick(token:string): Promise<boolean | void> {
  const response = await api.get<boolean>('/issick', {
    params: {
      token: token
    },
    cancelToken: source.token
  }, )
  .then(response => response.data)
  .catch(error => console.log(error));

  return response;
}
