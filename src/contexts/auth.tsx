import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";
import api from "../services/api";
import * as auth from "../services/auth";
import { LOCATION_TASK } from "../tasks/LocationTask";
import Location from "expo-location"

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
  
  const [user, setUser] = useState<User  | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    //api.defaults.headers.Authorization = `Baerer ${response.token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  async function signOut() {
    await AsyncStorage.clear();
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
  });

  


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
