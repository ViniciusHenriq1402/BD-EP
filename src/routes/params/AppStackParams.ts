import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LocationObject } from "expo-location";

export type AppStackParamsList = {
    Details: {showModal:boolean;} | undefined;
    Mapas: {locations:LocationObject | undefined} | undefined;
}
type detailsNavProp = StackNavigationProp<AppStackParamsList, 'Details'>;
type detailsRouteProp = StackNavigationProp<AppStackParamsList, 'Details'>;
type mapasNavProp = StackNavigationProp<AppStackParamsList, 'Mapas'>;
type mapasRouteProp = RouteProp<AppStackParamsList, 'Mapas'>

export type {detailsNavProp};
export type {mapasNavProp}
export type {detailsRouteProp}
export type {mapasRouteProp}

export interface mapasProps{
    navigation: mapasNavProp
    route: mapasRouteProp
}

export interface detailsProps{
    navigation: detailsNavProp
    route: detailsRouteProp
}