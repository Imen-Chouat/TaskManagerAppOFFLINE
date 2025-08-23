import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1 ,
        paddingVertical: 25 ,
        backgroundColor: "#fff" , 
        justifyContent:"center"
    }, pageTitle: {
        alignSelf: "center" ,
        marginTop: 20 , 
        fontSize: 20 ,
        fontWeight: "700" ,
        marginBottom: 14
    }, mainScroll: {
        width: "100%" ,
    }, scrollContent: {
        alignItems:"center" ,
        paddingBottom: 100

    },createButton:{
        padding: 5 ,
        paddingVertical: 15 ,
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },createText: {
        fontWeight: "900" ,
        fontSize: 16 ,
        color: "rgba(10, 0, 86, 1)" ,
    }
});