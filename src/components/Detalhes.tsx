import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FAB, Modal, Portal } from "react-native-paper";

import { detailsProp } from "../routes/params/AppStackParams";


const Details: React.FC = () =>{

    const navigation = useNavigation<detailsProp>()
    const [isVisible, setIsVisible] = React.useState(false);
  return (
    <>
      <Portal>
          <Modal visible={isVisible} contentContainerStyle={styles.modalContainer}>
            <Text>DETALHES</Text>
          </Modal>
      </Portal>
      <FAB
      style={styles.fab}
      icon="plus"
      onPress={() => setIsVisible(isVisible)}
      />

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
      fab: {
        position: 'absolute',
        margin: 24,
        right: 0,
        bottom: 0,
      },
})

export default Details;

