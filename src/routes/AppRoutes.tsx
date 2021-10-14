import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Details from '../components/Detalhes';
import { AppStackParamsList, detailsProp } from './params/AppStackParams';

const AppStack = createStackNavigator<AppStackParamsList>();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator 
  screenOptions={{headerShown: false, presentation: "modal",}} >
    
    <AppStack.Screen name="Details" 
    component={Details} 
    initialParams={{showModal:false}}  />
  </AppStack.Navigator>
);

export default AppRoutes;

//colocar screen para os detalhes e adicionar infec