import React from "react";

interface LocationContextData{
    latitude: number;
    longitude:number;
    timestamp: number | undefined
}

export const LocationContext = React.createContext<LocationContextData>({} as LocationContextData)