import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1 ,
        paddingVertical: 25 ,
        backgroundColor: "#fff" , 
        
    }, pageTitle: {
        alignSelf: "center" ,
        marginTop: 40 , 
        fontSize: 20 ,
        fontWeight: "700" ,
        marginBottom: 16
    }, mainScroll: {
        
    }, scrollContent: {
        alignItems:"center" ,
        paddingBottom: 100

    },createButton:{
        padding: 5 ,
        paddingVertical: 15 ,
        backgroundColor: "rgba(0, 0, 0, 0.4)" ,
        position: "absolute" ,
        bottom: "10%" ,
        right: "4%" , 
        backgroundColor: "rgba(100, 1, 1, 1)" ,
        width: 60 , 
        height: 60 ,
        alignItems: "center" ,
        justifyContent: "center" ,
        borderRadius: 70
    },createText: {
        fontWeight: "900" ,
        fontSize: 20 ,
        color: "rgba(10, 0, 86, 1)" ,
    },projectsList:{
        flex: 1 ,
        marginTop: 0 , 
    },emptyImage:{
        minHeight: 444 ,
    },emptyText:{
        fontWeight: "800" , 
        fontSize: 19 ,
        textAlign: "center" ,
    }
});