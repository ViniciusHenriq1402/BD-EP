import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../components/SignInModal';
import SignUp from '../components/SignUpModal';
import { AuthStackParamsList } from './params/AuthStackParams';

const AuthStack = createStackNavigator<AuthStackParamsList>()

const AuthRoutes = () => {
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false, presentation:"modal",}} >
            <AuthStack.Screen 
            name={"SignIn"} 
            component={SignIn} 
            initialParams={{showModal:false}} />
            <AuthStack.Screen 
            name={"SignUp"} 
            component={SignUp} />
            
                
        </AuthStack.Navigator>
    )
}

export default AuthRoutes