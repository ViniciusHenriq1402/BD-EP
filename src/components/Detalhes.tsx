import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";

import { detailsProp } from "../routes/params/AppStackParams";


const Details: React.FC = () =>{

    const navigation = useNavigation<detailsProp>()
    const [isVisible, setIsVisible] = React.useState(navigation.isFocused);
  return (
    <>
      <Portal>
          <Modal visible={isVisible}
           contentContainerStyle={styles.modalContainer}
           onDismiss={() => {navigation.navigate("Mapas"); setIsVisible(false);}}>
            <Text style={{fontSize: 50}}>DETALHES</Text>
          </Modal>
      </Portal>
      

    </>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 18, 
        backgroundColor:"white",
        justifyContent: "center",
        marginHorizontal: 16,
      },
      
})

export default Details;

