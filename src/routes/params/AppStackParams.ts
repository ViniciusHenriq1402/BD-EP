import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackParamsList = {
    Details: {showModal:boolean} | undefined;
    Mapas: undefined;
}

type detailsProp = StackNavigationProp<AppStackParamsList, 'Details'>;

export type {detailsProp};
