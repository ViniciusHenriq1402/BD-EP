import React from "react";
import { View, Text } from "react-native";

export function SplashScreen() {
    return (
      <View style={{backgroundColor:"black",flex:1}}>
        <Text style={{color:"white", fontSize:50}}>Loading...</Text>
      </View>
    );
  }