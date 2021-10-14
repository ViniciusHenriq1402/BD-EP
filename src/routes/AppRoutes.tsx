import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Mapa from '../pages/map/Map';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    
    <AppStack.Screen name="Maps" component={Mapa} />
    <AppStack.Screen name="Detalhes" component={Mapa} />
    <AppStack.Screen name="Maps" component={Mapa} />
  </AppStack.Navigator>
);

export default AppRoutes;

//colocar screen para os detalhes e adicionar infec