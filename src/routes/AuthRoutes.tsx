import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../components/SignInModal';
/* import SignUp from '../components/SignUpModal';
 */
const AuthStack = createStackNavigator()

const AuthRoutes = () => {
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false, presentation:"modal",}} >
            <AuthStack.Screen 
            name={"SignIn"} 
            component={SignIn} />
                
        </AuthStack.Navigator>
    )
}

export default AuthRoutes