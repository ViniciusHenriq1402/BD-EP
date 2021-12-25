import React from "react";
//nao esta sendo usado (somente uma ideia que eu tive)
interface LocationContextData{
    latitude: number;
    longitude:number;
    timestamp: number | undefined
}

export const LocationContext = React.createContext<LocationContextData>({} as LocationContextData)