import React from "react";
import { TouchableOpacity , StyleSheet,Text} from "react-native";

export default function ViewHomeButton({text}){
    return(
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        width:"80%",
        backgroundColor: "#EEE9FF" ,
        padding: 10 ,
        paddingBottom: 13 ,
        paddingTop:13,
        borderRadius: 16
    },buttonText : {
        textAlign: "center",
        color:"#5F33E1" ,
        fontWeight:'bold',
        fontSize: 20 ,
        
    }
});