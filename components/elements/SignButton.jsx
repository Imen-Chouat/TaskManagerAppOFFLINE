import React from "react";
import { StyleSheet , TouchableOpacity , Text} from "react-native";

export default function SignButton ({title ,onPress,style}){
    return (
        <TouchableOpacity style={[styles.button,style]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'rgb(0, 26, 255)',
        width: '80%' ,
        height: 40,
        borderColor: 'rgb(255, 255, 255)' ,
        borderWidth: 0.5 ,
        borderRadius: 14 ,
        justifyContent: 'center'
    },title: {
        textAlign: 'center' ,
        color: 'rgb(255, 255, 255)' ,
        fontSize: 17 ,
        fontWeight: 'bold'
    }
});