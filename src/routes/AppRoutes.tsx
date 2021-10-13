import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Map from '../pages/map/Map';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Maps" component={Map} />
  </AppStack.Navigator>
);

export default AppRoutes;