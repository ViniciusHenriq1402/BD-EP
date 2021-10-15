import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Details from '../components/Detalhes';
import { AppStackParamsList } from './params/AppStackParams';
import Mapas from '../pages/map/Map';

const AppStack = createStackNavigator<AppStackParamsList>();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator 
  screenOptions={{headerShown: false}} >
    
    <AppStack.Screen name={"Mapas"} component={Mapas} />
    <AppStack.Screen name="Details" 
    component={Details} 
    initialParams={{showModal:false}} 
    options={{presentation: "transparentModal"}} />

  </AppStack.Navigator>
);

export default AppRoutes;

//colocar screen para os detalhes e adicionar infec