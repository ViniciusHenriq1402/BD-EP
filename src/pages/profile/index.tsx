import React from "react";
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Button, Checkbox, DataTable, List, Modal, Portal, } from "react-native-paper";
import { useInfected } from "../../contexts/infected";
import { getDisease } from "../../services/api";
import { useAuth } from "../../contexts/auth";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import DiseasesTable from "./diseasesTable";



interface diseaseForm{
    ShowSymptoms: boolean;
    StartDate: Date
}

export default function Profile() {
    
    const { handleSignOut } = useInfected();
    const { token } = useAuth()
    const [isVisible, setIsVisible] = React.useState<boolean>(false)
    const [diseases, setDiseases] = React.useState<string[]>([])

    const [cured, setCured] = React.useState<boolean>(false)
    const [symptoms, setSymptoms] = React.useState<boolean>(false)

    const [startDate, setStartDate] = React.useState<Date>( new Date(Date.now()) );
    const [showStartDatePicker, setShowStartDatePicker] = React.useState<boolean>(false);

    const [endDate, setEndDate] = React.useState<Date>( new Date(Date.now()) );
    const [showEndDatePicker, setShowEndDatePicker] = React.useState<boolean>(false);

    const [showDropDown, setShowDropDown] = React.useState(false);
    const [value, setValue] = React.useState<ValueType | null>(null);
    const [items, setItems] = React.useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);
  
    const onChangeStartDate = (event: any, date?:Date | undefined): void => {
        const currentDate = date || startDate;
        setShowStartDatePicker(false)

        console.log(currentDate.toISOString())
        setStartDate(currentDate);
    };

    const onChangeEndDate = (event: any, date?:Date | undefined): void => {
        const currentDate = date || endDate;
        setShowEndDatePicker(false)
        console.log(currentDate.toISOString())
        setEndDate(currentDate);
    };
  
    React.useEffect( () => {
        //get diseases for dropdown
        async function getDiseaseNames(){
            let arr = [] as string[]
            if(!!token) {
                arr = await getDisease(token)
            } else 
                console.log( 'token nao existente profile');
            setDiseases(arr)     
        } 
        console.log('effect do profile')
        getDiseaseNames()
    },[])

    return (
        <View style={styles.container}>
            
            <View style={styles.buttonContainer}>
                <Button style={styles.buttonStyle} 
                mode="outlined" 
                color="red" 
                onPress={() => setIsVisible(true)}>
                Add Disease
                </Button>
                <Button style={styles.buttonStyle} 
                mode='contained' 
                color="red" 
                onPress={handleSignOut}>
                Sign out
                </Button>
            </View>

            <Portal>
                <Modal visible={isVisible}
                contentContainerStyle={styles.modalContainer}
                onDismiss={() => {setIsVisible(false)}}>
                    
                <View style={styles.formContainer}>
                    <View style={styles.InputContainer}>
                        <Text style={{  alignSelf:'center',width:"30%", marginHorizontal:'5%'}}>Disease name</Text>
                        <DropDownPicker
                        open={showDropDown}
                        value={value}
                        items={items}
                        setOpen={setShowDropDown}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Disease"
                        zIndex={10}
                        listMode="MODAL"
                        style={{ width:'60%', height:"100%", }}
                        dropDownContainerStyle={{ width:'60%',}}
                        />

                    </View>
                    <View style={styles.InputContainer}>
                        <Text style={{  alignSelf:'center',width:"40%", marginHorizontal:'5%'}}>Was the disease treated?</Text>
                        <Checkbox
                        status={cured ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setCured(!cured);
                        }}/>

                    </View>
                    <View style={styles.InputContainer}>
                        <Text style={{  alignSelf:'center',width:"40%", marginHorizontal:'5%'}}>Are you showing the symptoms?</Text>
                        <Checkbox
                        status={symptoms ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setSymptoms(!symptoms);
                        }}/>

                    </View>

                    <View style={styles.InputContainer}>
                        <Text style={{  alignSelf:'center',width:"40%", marginHorizontal:'5%'}}>Around when did you get infected?</Text>

                        <Button onPress={() => setShowStartDatePicker(true)} mode='outlined' 
                        color="black"
                        style={{alignSelf:'center', height:"100%", width:'50%', borderColor:'white'}}>
                        {startDate.toDateString()}
                        </Button>
                        {showStartDatePicker && (
                        <DateTimePicker
                        testID="dateStartTimePicker"
                        value={startDate}
                        display="default"
                        onChange={onChangeStartDate}
                        />
                        )}
                    </View>   
                    {cured && (<View style={styles.InputContainer}>
                        <Text style={{ alignSelf:'center',width:"40%", marginHorizontal:'5%'}}>When did you get treated?</Text>

                        <Button onPress={() => setShowEndDatePicker(true)} mode='outlined' 
                        color="black"
                        style={{alignSelf:'center', height:"100%", width:'50%', borderColor:'white'}}>
                        {endDate.toDateString()}
                        </Button>
                        {showEndDatePicker &&  (
                        <DateTimePicker
                        testID="dateEndTimePicker"
                        value={endDate}
                        display="default"
                        onChange={onChangeEndDate}
                        />
                        )}
                    </View>)}            

                   
                </View> 
                <View style={styles.buttonContainer}>
                    {/* <Button style={styles.buttonStyle} 
                    mode="outlined" 
                    color="grey" 
                        onPress={() => setShowDatePicker(false)}>
                    Voltar
                    </Button> */}
                    <Button style={styles.buttonStyle} color="red" 
                    mode="contained" 
                    onPress={() => setIsVisible(false)}>
                        Submit
                    </Button>
                </View>
                </Modal>
            </Portal>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:"center",
    },
    modalContainer: {
        borderRadius: 18, 
        backgroundColor:"white",
        marginHorizontal: 16,
        justifyContent:"space-evenly",
        alignContent:'center',
        overflow:'hidden',

    },
    formContainer:{
        padding: 5,
        margin: 5,
    },
    InputContainer:{
        position:'relative',
        height: 40,
        margin:5,
        flexDirection:"row",
        zIndex:-1
        
    },
    dataTableContainer:{
        margin: 10,

    },
    buttonContainer:{
        flexDirection: "row",
        alignSelf:"center"
    },
    buttonStyle:{
        margin: 10,
        padding: 10,
    },


})