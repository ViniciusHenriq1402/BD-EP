import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from 'react-native'
import { Button, } from "react-native-paper";
import { signUpProp } from "../../routes/params/AuthStackParams";
import { useAuth } from "../../contexts/auth";

export default function StatusPage() {
    
    const navigation = useNavigation<signUpProp>()

    return (
        <View style={styles.container}>
          <Text style={{ fontWeight:"500", fontSize:24, alignSelf:"center", marginTop:20}}>
              Status 
          </Text>
            
            <View style={styles.buttonContainer}>
                <Button style={styles.buttonStyle} 
                mode="outlined" 
                color="red" 
                onPress={() => navigation.goBack()}>
                Voltar
                </Button>
                
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:"center",
    },
    signInContainer:{
        flexDirection: "column",
        margin: 10,
        padding: 10,
    },
    textInputContainer:{
        marginVertical: 0
    },
    textInputStyle:{
        height: 40,
    },
    buttonContainer:{
        flexDirection: "row",
        justifyContent:"center",
    },
    buttonStyle:{
        margin: 10,
        padding: 10,
    },


})