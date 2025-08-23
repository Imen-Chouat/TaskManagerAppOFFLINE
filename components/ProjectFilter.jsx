import React, { useState } from "react";
import { ScrollView, StyleSheet , TouchableOpacity, View ,Text} from "react-native";


export default function ProjectFilter ({style , onPress}) {
    const [selected , setSelected ] = useState("In Progress");
    const tabs = ["All","In Progress" , "Past","Comming"];
    const handleFiltering = async (tab) => {
        onPress(tab);
        setSelected(tab);
    }
    return(
        <ScrollView style={[styles.container,style]} horizontal={true} showsHorizontalScrollIndicator={false} >
            {
             tabs.map((tab,index) => (
                <TouchableOpacity style={selected == tab ? [ styles.tab ,  styles.selected ]: styles.tab } 
                onPress={() => handleFiltering(tab) } key={index}>
                    <Text style={[styles.text,selected == tab ? styles.textSelected :styles.tabText]} >{tab}</Text>
                </TouchableOpacity>
                ))   
            }
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container : {
        padding: 10 , 
        minHeight: 80
    },tab:{
        paddingHorizontal: 20 ,
        borderRadius: 25 ,
        backgroundColor: "rgba(100, 1, 1, 0.25)" ,
        marginRight: 10 ,
        maxHeight: 50 ,
        justifyContent: "center" ,
        alignItems: "center"
    },selected:{
        backgroundColor: "rgba(100, 1, 1, 1)"
    },text:{
        fontSize: 20 ,
        fontWeight: "bold" ,
    },tabText:{
        color: "rgba(100, 1, 1, 1)" ,
    },textSelected:{
        color: "rgba(255, 255, 255, 1)" ,
    }
});