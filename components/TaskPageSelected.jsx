import React, { useState } from "react";
import { Text , View , StyleSheet, Pressable, Touchable, TouchableOpacity } from "react-native" ;
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "expo-image";
import { Platform } from "react-native";
import Icons from "../constants/Icons";
import TaskEditModal from "./TaskEditModal";
    const colors = [
        ["#40E0D0","#cefffaff"],
        ["rgba(133, 148, 40, 1)","#DFFF00"],
        ["#DE3163","#ffabc3ff"],
        ["#8181d4ff","#CCCCFF"],
        ["#cc70a0ff","#f0d2e1ff"],
        ["#9260F4","#c9aeffff"],
        ["#FF9142","#ffd1afff"],
        ["#FFD12E","#ffeba4ff"] 
    ];
    let index = 0 ;
    let color0 , color1  ;
export default function TaskPageSelected ({task,onPress}){
    const [visibility,setVisibility] = useState(false);
    index = task.id % (colors.length -1 )  ;
    color0 = colors[index][0];
    color1 = colors[index][1]; 
    return(
        <Pressable  onPress={()=>{onPress()}}>
        <View style={[styles.container,styles.shadow]}>
            <View style={styles.topColumn}>
                <View style={styles.textColumn} >
                    <Text style={styles.categoryName} >{task.category.name}</Text>
                    <Text style={styles.title}>{task.title}</Text>
                </View>
                <View style={[styles.iconWraper,{backgroundColor:color1 , borderColor:color0 , borderWidth:1}]} >
                    <Image source={Icons[task.category.icon]} style={styles.categoryIcon}/>
                </View>
            </View>

            <View style={styles.lastColumn} >
                <View style={styles.timeBlock} >
                    <Icon name={"clock-o"} size={20} style={styles.timeIcon} color={"#AB94FF"} />
                    <Text style={styles.time} >{task.time}</Text>
                </View>
                <View style={[styles.state , task.state == "To-do" ? styles.todo : task.state == "Done" ? styles.done : task.state == "In Progress" ? styles.inprogress : styles.missing ]} >
                    <Text style={[styles.stateText,task.state == "To-do" ? styles.todo : task.state == "Done" ? styles.done : task.state == "In Progress" ? styles.inprogress : styles.missing]}>{task.state}</Text>
                </View>
            </View>
            <View style={styles.buttonColumn} >
                <TouchableOpacity style={[styles.button,styles.editButton]} onPress={()=>setVisibility(true)} >
                    <Text style={styles.buttonText} >Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,styles.deleteButton]} >
                    <Text style={styles.buttonText} >Delete</Text>
                </TouchableOpacity>
            </View>
            <TaskEditModal visible={visibility} onClose={() => setVisibility(false)} task={task} />
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "column" ,
        margin: 10 ,
        padding:18 , 
        borderRadius: 30 ,
        backgroundColor: "rgba(131, 64, 64, 1)" ,
        backgroundColor: "#b85858ff"
        
    },topColumn:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom: 10,
        alignItems:"center"
        
    },categoryName:{
        color:"rgba(0, 0, 0, 0.85)",
        fontSize:15 ,
        fontWeight: "600"
    },iconWraper:{
        justifyContent:"center",
        alignItems:"center" ,
        aspectRatio:1 ,
        padding:5 ,
        borderRadius:10
    },categoryIcon:{
        width: 30 ,
        height: 30 , 
    },textColumn:{
        marginBottom: 7 ,
    },title:{
        fontSize:21,
        fontWeight:"600" ,
    },lastColumn:{
        flexDirection:"row" ,
        justifyContent:"space-between"
    },timeBlock:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },timeIcon:{
        marginRight: 6 ,

    },time:{
        color: "#AB94FF" ,
        textAlign: "center" ,
        fontWeight: "700" ,
        fontSize: 17
    },state:{
        padding : 3 ,
        borderRadius : 9 ,
        paddingHorizontal: 9 ,
    },done:{
        backgroundColor:"#EDE8FF",
        color:"#5F33E1",
    },todo:{
        backgroundColor:"#E3F2FF",
        color:"#0087FF"
    },inprogress:{
        backgroundColor:"#FFE9E1",
        color:"#FF865E"
    },missing:{
        backgroundColor:"#fee3ffff",
        color:"#F478B8"
    },stateText:{
        fontWeight:"700"
    },shadow: {
        ...Platform.select({
            ios: {
            shadowColor: '#ffd0005e',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            },
            android: {
            elevation: 6,
            },
        }),
        backgroundColor: "rgba(199, 251, 255, 1)", // Needed for shadow to show properly
    },buttonColumn:{
        flexDirection: "row" ,
        justifyContent: "space-around"
    },button:{
        padding: 5 , 
        paddingHorizontal: 30 ,
        borderRadius: 15 ,
        marginTop: 10
    },editButton:{
        backgroundColor: "rgba(1, 153, 9, 1)"
    },deleteButton:{
        backgroundColor: "rgba(248, 82, 82, 1)"
    },buttonText:{
        fontSize: 16 , 
        fontWeight: "bold" ,
        color: "#fff"
    }

});