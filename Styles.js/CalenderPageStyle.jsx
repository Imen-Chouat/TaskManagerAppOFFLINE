import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    padding: 20,
    maxHeight: 400,
    marginTop: 25 ,
    marginBottom: 2,
    
  },subContainer:{
    flex: 1 ,
    borderRadius: 25 ,
    backgroundColor:"#27223aff",
    paddingBottom: 60
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 60 ,
    color:"#ffffffff"
  },calender: {
    margin: 5 ,
    marginTop: 40,
    marginBottom: 10 ,
    borderWidth: 1, 
    borderRadius: 10 ,
    borderColor: "rgba(0, 119, 255, 1)",
   
  },containerScroll:{
    flex: 1
  },taskContainer:{
    flexDirection: "row" ,
    justifyContent: "space-between",
    marginBottom: 25 ,
    alignItems: 'center'
  },taskText: {
    fontSize: 16,
    fontWeight: 'bold' ,
    color : "rgba(0, 0, 0, 1)",
    maxWidth:"30%"
  },icon:{
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 6 ,
    borderRadius: 35 ,
  },done:{
    backgroundColor: "rgba(166, 255, 188, 0.77)",
    fontWeight: 'bold',
    fontSize: 14 , 
    padding: 5 ,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 19,
    textAlign: 'center',
    color: "rgba(76, 0, 255, 1)"
  },ongoing:{
    backgroundColor: "rgba(255, 173, 237, 0.74)",
    fontWeight: 'bold',
    fontSize: 14 , 
    padding: 5 ,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 19,
    textAlign: 'center',
    color: "rgba(255, 255, 255, 1)"
  },missed:{
    backgroundColor: "rgba(170, 71, 71, 0.9)",
    fontWeight: 'bold',
    fontSize: 14 , 
    padding: 5 ,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 19,
    textAlign: 'center',
    color: "rgba(255, 255, 255, 1)"
  },coming:{
    backgroundColor: "rgba(255, 254, 173, 0.86)",
    fontWeight: 'bold',
    fontSize: 14 , 
    padding: 5 ,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 19,
    textAlign: 'center',
    color: "rgba(0, 17, 255, 1)"
  }
});