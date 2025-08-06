import React, { useState } from "react";
import { StyleSheet , TouchableOpacity , View , Text  , ScrollView} from "react-native";



export default function TaskFilter ({style , onPress}){
    const types = ["All","Done","To-do","In Progress","Missed"];
    const [selected,setSelected] = useState("All");
    const handlePress = (type)=>{
        setSelected(type);
    }
    return(
        <ScrollView horizontal={true} style={[styles.container,style]} showsHorizontalScrollIndicator={false}>
            {
                types.map((type,index)=>(
                    <TouchableOpacity style={[styles.type,type == selected ? styles.typeOn : styles.typeOff]} key={index}
                    onPress={()=>{onPress(type); handlePress(type);}}>
                        <Text style={[styles.text,type == selected ? styles.textOn : styles.textOff]} >{type}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginLeft: 13
    },type:{
        padding: 1 ,
        justifyContent:"center",
        marginTop:13 ,
        alignItems: "center" ,
        paddingHorizontal:12 ,
        borderRadius: 18 ,
        marginRight: 13 , 
        paddingVertical: 6

    },typeOn:{
        backgroundColor:"rgba(58, 102, 223, 1)"

    },typeOff:{
        backgroundColor:"rgba(195, 219, 252, 0.47)",
        borderColor: "rgba(212, 241, 245, 1)" ,
        borderColor: "rgba(67, 108, 221, 1)",
        borderWidth: 0.7
    },text:{
        fontSize: 18 ,
        padding:0 ,
        fontWeight: "bold"
    },textOn:{
        color:"rgba(255, 255, 255, 1)"
    },textOff:{
        color:"rgba(58, 102, 223, 1)"
    }
});
/*"rgba(14, 227, 255, 1)" */