import AsyncStorage from "@react-native-async-storage/async-storage"
import { LocationObject } from "expo-location";

export const locationsStorageName = 'bg-locations'

export async function getLocations() {
    const data = await AsyncStorage.getItem(locationsStorageName);
    return data ? JSON.parse(data) : [];
}

export async function setLocations(locations: LocationObject[]): Promise<void> {
    await AsyncStorage.setItem(locationsStorageName, JSON.stringify(locations));
}

export async function addLocation(location: LocationObject): Promise<LocationObject[]> {
    const existing = await getLocations();
    const locations = [ location, ...existing];
    if(locations.length === 11) locations.pop();
    await setLocations(locations);
    console.log('[storage]', 'added location -', locations.length, 'stored locations');
    return locations;
}

export async function clearLocations(): Promise<void> {
    await AsyncStorage.removeItem(locationsStorageName);
    console.log('[storage]', 'cleared locations');
  }