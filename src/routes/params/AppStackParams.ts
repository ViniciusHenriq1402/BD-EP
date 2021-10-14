import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackParamsList = {
    Details: {showModal:boolean,};
}

type detailsProp = StackNavigationProp<AppStackParamsList, 'Details'>;

export type {detailsProp};
