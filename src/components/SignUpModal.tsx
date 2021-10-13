import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Button, HelperText, Modal, TextInput } from 'react-native-paper';

function isEmpty(str:string) {
    return (!str || str.length === 0 );
}
const SignUp = ({navigation}) => {

    const [isVisible, setIsVisible] = React.useState(true)

    const [email, setEmail] = React.useState("")
    const [pw, setPw] = React.useState("")
    const [pw2, setPw2] = React.useState("")

    const hasEmailError = () => {
        return isEmpty(email)
    }

    const hasPwError = () => {
        return (pw !== pw2 || isEmpty(pw) || isEmpty(pw2))
    }

    const hideModal = () => {
        setIsVisible(false)
    }
    return (
      <Modal visible={isVisible} 
      contentContainerStyle={styles.modalContainer} 
      dismissable={true}>

        <View style={styles.container}>
            <Text style={{ fontWeight:"200", fontSize:24, alignSelf:"center", marginTop:20}}>
                Criar nova conta
            </Text>

            <View style={ styles.formContainer }>
                <View style={ styles.inputContainer }>
                    <TextInput 
                    mode='outlined' label={'Email'}/>
                    <HelperText type="error" visible={hasEmailError()}>
                    Digite seu email
                    </HelperText>
                </View>
                <View style={ styles.inputContainer}>
                    <TextInput 
                    mode='outlined' label={'Senha'}/>
                </View>
                <View style={ styles.inputContainer}>
                    <TextInput 
                    mode='outlined' label={'Confirmar Senha'}/>
                    <HelperText type="error" visible={hasPwError()}>
                        Digite a senha
                    </HelperText>
                </View>
                
            </View>
        <View style={styles.buttonContainer}>
            <Button style={styles.buttonStyle} color='grey'
                mode="contained" onPress={() => navigation.goBack() }>
                    Back
            </Button>    
            <Button style={ styles.buttonStyle} color='red'
            mode="contained" 
            onPress={() => {setIsVisible(false); navigation.navigate("Sign in") }}>
                Sign Up
            </Button>
        </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 18, 
        backgroundColor:"white",
        justifyContent: "center",
        alignSelf:"auto",
        marginHorizontal: 16,
    },
    container: {
    },
    formContainer: {
        margin: 10,
        padding: 10,

    },
    inputContainer: {
        
    },
    buttonContainer: {
        flexDirection: "row", 
        justifyContent:"center",
        marginVertical: 15
    },
    buttonStyle: {
        margin: 5,
        padding: 5
    },
    
});
export default SignUp