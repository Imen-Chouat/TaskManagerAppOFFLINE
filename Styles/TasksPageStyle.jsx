import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1 ,
    },scroll:{
        flex : 1 ,
    },scrollContent:{
        paddingBottom: 140, 
    },calendarStrip:{
        top:8
    },filter:{
        marginTop: 10,
        marginBottom: 15
    },title:{
        textAlign: "center" ,
        marginTop: 40 ,
        fontSize: 24 ,
        fontWeight: "700"
    },emptyContainer:{
        alignItems:"center",
        flex:1 ,
        justifyContent: "center"
    },emptyMessage:{
        fontWeight:"700",
        fontSize: 20 ,
        textAlign:"center" , 
        position:"absolute" ,
        top: "5%"

    },emptyImage:{
        resizeMode:"contain",
        width:"110%",
    },createTaskButtin: {
        position: "absolute" ,
        bottom: "7%" ,
        right: "4%" ,
        backgroundColor: "#0f4ea0", 
        borderRadius: 100 ,
        width: 60 ,
        height: 60 ,
        justifyContent: "center" ,
        alignItems: "center" ,
        zIndex: 5
    },createText:{
        fontSize: 40 ,
        fontWeight: "900" ,
        color: "#fff"
    }
});