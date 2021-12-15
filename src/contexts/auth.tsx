import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";
import * as api from "../services/api";
import { registerBackgroundFetchAsync, unregisterBackgroundFetchAsync } from "../tasks/BackgroundFetch";

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: object | null;
  isLoading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
} 

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alerta, setAlerta] = useState(false)

  async function signIn() {
    
    var cpf = "tony";
    var pw = "batata";
    const response = await api.signIn(cpf, pw);

    if(response) {
      
      const user: User = {name: "tony", email: "batata@batata"}

      console.log( "resposta " + response )
      await AsyncStorage.setItem('@RNAuth:token', response );
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify( user ));
      setUser( user )
      registerBackgroundFetchAsync()
    
    } 
    
    //versao antiga
    //setUser(response.user);
    //await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
  }

  async function signOut() {
    await AsyncStorage.clear();
    unregisterBackgroundFetchAsync()
    setUser(null);
  }

 React.useEffect(() => {

    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        //api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
      setIsLoading(false)
    }
    
    loadStorageData();

  }),[]; 
  
  //caso precise dar um alerta
  /* React.useEffect(() => {
      if(alerta){
        alert("alerta get")
        setAlerta(false)
      }
      console.log("nenhuma notif"); 
  }, [alerta]) */
  

  return (
    <AuthContext.Provider value={{ signed: !!user, user, isLoading, signIn, signOut }}>
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
