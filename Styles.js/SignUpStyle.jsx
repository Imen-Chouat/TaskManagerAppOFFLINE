import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient:{
        flex: 1 ,
        position: 'relative' ,
        width: '100%',
        paddingTop: 15
    },
    containerA : {
        position: 'relative' ,
        maxHeight: '30%'
    },image:{
        width: '85%' ,
        resizeMode: 'contain',
        position: 'absolute' ,
        top: -116 ,
        alignSelf: 'center'
    },welcomeText:{
        position: 'absolute' ,
        top: '235' ,
        fontWeight: 'bold' , 
        alignSelf: 'center' ,
        fontSize: 24 
    },icon:{
        position: 'absolute' ,
        top: 20 ,
        left: 10
    },containerB : {
        backgroundColor: 'rgb(142, 244, 252)',
        position: 'absolute' ,
        bottom: 0 ,
        width: '100%' ,
        minHeight: '65%' ,
        alignItems: 'center',
        paddingTop: 20 ,
        borderTopLeftRadius: 25 ,
        borderTopRightRadius: 25
    },input: {
        borderColor: 'rgb(100,100,100)',
        borderWidth: 1 , 
        margin: 10 ,
        fontSize: 15,
        fontWeight: 'bold' ,
        backgroundColor: 'rgba(255, 255, 255, 0.8)' ,
        borderRadius: 12 ,
        padding: 14
    },inputContainer: {
        width: '97%' , 
    },signIn:{
        textDecorationLine: 'underline' ,
        color: 'rgb(72, 255, 0)'
    },dont: {
        position: 'absolute',
        bottom: '15%' ,
        fontSize: 17 ,
        fontWeight: 'bold',
        color:'rgb(255, 255, 255)'
    },signButton:{
        marginTop: 40
    },showIcon:{
        position:"absolute",
        top :"31%"  ,
        right: "20" ,
        color: "rgba(104, 102, 102, 1)"
    }
});