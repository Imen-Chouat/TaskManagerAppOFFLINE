import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
   mainScroll: {
    paddingBottom: 170 ,
    flex: 1
    },
    scrollContent: {
    paddingBottom: 170, 
    flexGrow: 1 
    
  }, container :{
        flex: 1 ,
        padding: 5 ,
        backgroundColor:"#FFFFFF"
    },imageContainer:{
        borderRadius: 56 ,
        width: "15%"
    },profileImage: {
        width: "45" ,
        aspectRatio: 1 ,
        height: 60 ,
        resizeMode: "contain" ,
        backgroundColor:"rgb(100,100,100)" ,
        borderRadius: 90 
    },profileContainer: {
        height: 90 ,
        marginTop: 13  ,
        marginLeft: 23 ,
        flexDirection: 'row' ,
        alignItems: 'center' ,
        marginBottom: 14
    },welcomeBlock:{
        width: '66%',
        marginLeft: 25 ,
    },profileIcon: {
        width: "15%"
    },helloText:{
        fontSize: 14 ,
        fontFamily: "Ariel"
    },userName: {
        fontSize: 20 ,
        fontFamily: "Roboto" ,
        fontWeight: 'bold'
    },percentageBlock:{
        backgroundColor: "#5F33E1" ,
        flexDirection: "row",
        marginTop: -10,
        marginRight : 13 ,
        marginLeft: 13,
        borderRadius: 35 ,
        padding: 10,
        paddingRight: 17 ,
        maxHeight:165 ,
        minHeight: "165"
    },viewBlock: {
        marginRight: 14 ,
        flexDirection: 'column',
        alignItems: 'center',
        width:"60%"
    },pencentageText:{
        fontSize: 15,
        fontWeight:'bold',
        marginBottom: 25 ,
        marginLeft: 15 ,
        marginTop: 14 ,
        color: "#FFFFFF",
    },circleContainer:{
        justifyContent: 'center',
        alignItems: "center",
        marginRight: 16
    },circleText:{
     fontWeight: "500",
    },projectAnnounce:{
        fontSize:23 ,
        margin:15 ,
        fontWeight: '900' ,
        marginLeft:18
    },count : {
        fontSize: 15 ,
    },countView:{
        textAlign: "center" ,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#DFFF00" ,
        borderRadius: 34 ,
        width:25 ,
        height:25 ,
        padding:4 ,
        alignSelf:"center"
    },taskList:{
        
    },taskSlide:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:10
    },tasksList:{
        
    },taskAnnounce:{
        fontSize: 23 ,
        fontWeight: 'bold'
    },tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});