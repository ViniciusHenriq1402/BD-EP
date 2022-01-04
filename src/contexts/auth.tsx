import AsyncStorage from "@react-native-async-storage/async-storage";
import * as TaskManager from "expo-task-manager";
import React, { createContext, useState } from "react";
import { postUserLogin } from "../services/api/UserApi";
import { registerBackgroundFetchAsync } from "../tasks/BackgroundFetch";

interface User {
  document: string;
  token: string;
}

interface AuthContextData {
  signed: boolean;
  user: object | null;
  isLoading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
  token: string | null;
} 

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  async function signIn() {
    
    var cpf = "tony";
    var pw = "batata";
    let response = await postUserLogin(cpf, pw);
    response = "wadsa"
    if(response) {
      
      const user: User = {document: "tony", token: "tokenaaaaa"} 

      await AsyncStorage.setItem('@RNAuth:token', 'tokentemporario' );
      /*  await AsyncStorage.setItem('@RNAuth:user', JSON.stringify( user )); */
      //object user temporario 
      setUser( user )
      
      
      setToken('tokentemporario')
      console.log( "login token", token )
      registerBackgroundFetchAsync()
    
    } 
    
    //versao antiga
    //setUser(response.user);
    //await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
  }

  async function signOut() {
    await AsyncStorage.clear();
    TaskManager.unregisterAllTasksAsync();
    setUser(null);
  }

 React.useEffect(() => {

    async function loadStorageData() {
      /* const storagedUser = await AsyncStorage.getItem('@RNAuth:user'); */
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
      const storagedIssick = await AsyncStorage.getItem('@Api:issick');
      if (/* storagedUser && */ storagedToken) {
        const user: User = {document: "tony", token: "tokenaaaaa"} 
        
        setUser(user);
        setToken(storagedToken)
        //console.log(`token ${storagedToken}`)
        console.log( "login token", storagedToken )
        
      }
      setIsLoading(false)

      if (storagedIssick){
        await AsyncStorage.removeItem('@Api:issick')
      } 
    }
    
    loadStorageData();

  },[]); 
  
  return (
    <AuthContext.Provider value={{ signed: !!user, user, isLoading, signIn, signOut, token }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {

  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {AuthProvider, useAuth};
