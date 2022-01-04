import { api } from "./api";

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