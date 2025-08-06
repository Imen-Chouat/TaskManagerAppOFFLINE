import React from "react";
import { StyleSheet , View , Text , TouchableOpacity } from "react-native";

export default function CreateCaategoryButton({title,onPress,style}){
    return(
        <TouchableOpacity style={[styles.button , style]} onPress={onPress}>
            <Text style={styles.text} >{title}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button:{
        backgroundColor:"rgba(215, 206, 255, 1)",
        justifyContent:"center",
        padding: 10 ,
        borderRadius: 13 ,
        paddingLeft:10,
        paddingRight: 10
    },text:{
        fontWeight: 'bold',
        color:"rgba(60, 0, 138, 1)"
    }
});