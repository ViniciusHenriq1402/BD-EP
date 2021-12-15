import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from "react-native-paper";
import { signUpProp } from "../../routes/params/AuthStackParams";

export default function SignUp() {
    
    //TODO:Validacao dos TextInput
    

    const navigation = useNavigation<signUpProp>()

    const [cpf, setCpf] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pw, setPw] = React.useState("")

    return (
        <View style={styles.container}>
          <Text style={{ fontWeight:"500", fontSize:24, alignSelf:"center", marginTop:20}}>Fazer login</Text>
            <View style={ styles.signInContainer }>
                <View style={{marginVertical: 10}}>
                  <TextInput 
                  mode='outlined' label={'CPF'} 
                  onChangeText={(text) => {setCpf(text)}}/>
                </View>
                <View style={{marginVertical: 10}}>
                  <TextInput 
                  mode='outlined' label={'Email'} 
                  onChangeText={(text) => {setEmail(text)}}/>
                </View>
                <View style={{marginVertical: 10}}>
                  <TextInput 
                  mode='outlined' label={'Senha'} secureTextEntry={true}
                  onChangeText={(text) => {setPw(text)}}/>
                </View>
                <View style={{marginVertical: 10}}>
                    <TextInput 
                    mode='outlined' label={'Confirmar senha'} secureTextEntry={true}
                    onChangeText={(text) => {setPw(text)}}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.buttonStyle} 
                mode="outlined" color="grey" onPress={() => navigation.goBack()}>
                    Back
                </Button>
                <Button style={styles.buttonStyle} color="red" 
                mode="contained" onPress={() => navigation.navigate("SignIn")}>
                    Sign Up
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
    buttonContainer:{
        flexDirection: "row",
        justifyContent:"center",
    },
    buttonStyle:{
        margin: 10,
        padding: 10,
    },
    

})