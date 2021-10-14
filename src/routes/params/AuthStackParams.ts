import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackParamsList = {
    SignIn: {showModal:boolean};
    SignUp: {showModal:boolean};
}

type signInProp = StackNavigationProp<AuthStackParamsList, 'SignIn'>;
type signUpProp = StackNavigationProp<AuthStackParamsList, 'SignUp'>;

export type {signInProp};
export type {signUpProp};
