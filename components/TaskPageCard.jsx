import React from "react";
import { Text , View , StyleSheet } from "react-native" ;
import Icon from "react-native-vector-icons/FontAwesome";
import { Platform } from "react-native";
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
export default function TaskPageCard ({task}){
    color0 = colors[index][0];
    color1 = colors[index][1];
    index = index +1 == colors.length ? 0 : index + 1 ;
    return(
        <View style={[styles.container,styles.shadow]}>
            <View style={styles.topColumn}>
                <Text style={styles.categoryName} >{task.category.name}</Text>
                <View style={[styles.iconWraper,{backgroundColor:color1 , borderColor:color0 , borderWidth:1}]} >
                   <Icon name={task.category.icon} style={styles.categoryIcon} color={color0} size={16} />
                </View>
            </View>
            <View style={styles.textColumn} >
                <Text style={styles.title}>{task.title}</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "column" ,
        margin: 10 ,
        padding:18 , 
        borderRadius: 30 ,
        
    },topColumn:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom: 4,
        alignItems:"center"
        
    },categoryName:{
        color:"rgba(100, 100, 100, 0.85)",
        fontSize:15 ,
        fontWeight: "600"
    },iconWraper:{
        justifyContent:"center",
        alignItems:"center" ,
        aspectRatio:1 ,
        padding:7 ,
        borderRadius:10
    },categoryIcon:{

    },textColumn:{
        marginBottom: 7
    },title:{
        fontSize:21,
        fontWeight:"600"
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            },
            android: {
            elevation: 6,
            },
        }),
        backgroundColor: "#fff", // Needed for shadow to show properly
    },

});