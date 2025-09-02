import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        padding: 15 ,
        paddingVertical:30 ,
        backgroundColor:"rgba(255, 255, 255, 1)" ,
        flex:1
    },upperSide:{
        flexDirection:"row" ,
        justifyContent:"center" ,
        alignItems:"center" ,
        marginVertical: 20
    },pageTitle:{
        fontWeight: "bold" ,
        fontSize: 21 ,
        color: "rgba(17, 128, 192, 1)" 
    },titleText:{
        fontSize: 17 ,
        fontWeight: "800" ,
        marginHorizontal: 10 ,
        color: "rgba(56, 129, 7, 1)" , 
        marginBottom: 10 ,
        marginTop: 1
    },titleInput:{
        borderWidth: 1 ,
        borderColor: "rgba(56, 129, 7, 1)" ,
        borderRadius: 12 ,
        paddingLeft: 10 ,
        fontSize: 15 ,
        fontWeight: "600" ,
        marginBottom: 12
    },arrowLeftWrapper:{
        position: "absolute" ,
        left: 15 , 
        alignSelf:"center" ,
        justifyContent:"center"
    },arrowLeft:{
        width: 38 ,
        height: 40 ,
    },iconSelector:{
        marginBottom: 10
    },informDate:{
        fontSize: 16 , 
        fontWeight: "900"
    },datePress:{
        paddingHorizontal: 15 ,
        marginHorizontal: 14 ,
        borderWidth: 1 ,
        borderColor: "rgba(17, 128, 192, 1)" ,
        padding: 4 , 
        backgroundColor: "rgba(255, 255, 255, 0.19)" ,
        borderRadius: 15
    },dateText:{
        fontSize: 15 , 
        fontWeight: "800" ,
        color: "rgba(17, 128, 192, 1)" ,
    },descriptionLength:{
        backgroundColor: "rgba(247, 255, 242, 1)",
        paddingHorizontal: 10 ,
        borderRadius: 15,
        paddingVertical: 1 ,
        color: "rgba(56, 129, 7, 1)" ,
        fontSize: 15 ,
        fontWeight: "700" ,
        borderWidth: 1.5 ,
        borderColor: "rgba(56, 129, 7, 1)" ,
    },description:{
        borderColor: "rgba(56, 129, 7, 1)" ,
        borderWidth: 1 ,
        height: 140 ,
        borderRadius: 13 ,
        padding: 15 ,
        fontWeight:"700" ,
        fontSize: 15 
    },imageBlock:{
        alignSelf: "center" ,
        alignItems: "center" ,
        borderWidth: 1 ,
        borderColor: "rgba(56, 129, 7, 1)" ,
        padding: 15 ,
        borderRadius: 20 
    },imageText:{
        fontWeight: "600" ,
        fontSize: 16 ,
        marginBottom: 14
    },imageContainer:{
        padding: 10 ,
        backgroundColor: "rgba(17, 128, 192, 1)"  ,
        borderRadius: 10 ,
        margin: 10
    },projectImage: {
        width:75 ,
        height:75 ,
        
    }, modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    }, modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        maxHeight: "80%",
    },modalText:{
        fontWeight:"bold",
        fontSize: 16
    },imageWraper:{
        borderRadius:10 ,
        padding:5,
        borderColor:"rgba(0, 0, 0, 1)",
        borderWidth:0.5 ,
        margin: 1
    },iconOn:{
        backgroundColor: "rgba(17, 128, 192, 1)" 
    },image:{
        width:58 ,
        height:58 
    },closeModal:{
        backgroundColor:"rgba(163, 39, 39, 1)" ,
        borderRadius:40 ,
        padding:5 ,
        minWidth:80 ,
        alignSelf:"center" ,
        alignItems:"center",
        justifyContent:"center"
    },closeModalText:{
        color:"#fff"
    },button:{
        alignSelf: "center" ,
        paddingVertical: 10 ,
        paddingHorizontal: 25 ,
        borderColor: "rgba(8, 139, 25, 1)" ,
        borderWidth: 1 ,
        borderRadius: 16 ,
        backgroundColor: "rgba(66, 122, 160, 1)" ,
        marginTop: 15 ,
    },buttonText:{
        fontSize: 16 ,
        fontWeight: "800" ,
        color: "#ffffffff" ,

    }
});