import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackParamsList = {
    SignIn: {showModal:boolean} | undefined;
    SignUp: {showModal:boolean} | undefined;
}

type signInProp = StackNavigationProp<AuthStackParamsList, 'SignIn'>;
type signUpProp = StackNavigationProp<AuthStackParamsList, 'SignUp'>;

export type {signInProp};
export type {signUpProp};
