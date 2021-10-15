import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackParamsList = {
    Details: {showModal:boolean} | undefined;
    Mapas: undefined;
}

type detailsProp = StackNavigationProp<AppStackParamsList, 'Details'>;
type mapasProp = StackNavigationProp<AppStackParamsList, 'Mapas'>;

export type {detailsProp};
export type {mapasProp}