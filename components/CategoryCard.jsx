import React, { useState } from "react";
import { StyleSheet , Text ,View , Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
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
let randIndex = 0;
export default function CategoryCard({category}){
    const [categoryTasks,setTasks] = useState(Math.round(Math.random()*100));
    const [percentage,setPercentage] = useState(Math.random());
    const color = colors[randIndex];
    const color1 = color[1]
    randIndex = randIndex+1 == colors.length ? 0 : randIndex +1 ;
    return(
        <View style={[styles.container,styles.shadow]}>
            <View style={[styles.iconWraper,{backgroundColor: `${color1}` }]}>
            <Icon name={category.icon} size={20} color={color[0]}/>
            </View>
            <View style={styles.categoryContainer}>
                <Text style={styles.name} >{category.name}</Text>
                <Text style={styles.count} >{categoryTasks} Tasks.</Text>
            </View>
            <Progress.Circle 
                progress={percentage} size={43} showsText={true} color={color[0]} thickness={4} borderWidth={0} 
                textStyle={{color : `${color[0]}`, fontWeight: '800',fontSize:13 , textAlign:"center"}} 
                formatText={ ()=>`${Math.round(percentage*100)}%`} unfilledColor="#eee"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(255, 255, 255, 1)",
        margin:10 ,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center" ,
        paddingTop: 10 ,
        paddingBottom: 10 ,
        borderRadius: 15 ,
        boxShadow:""
    },iconWraper:{
        width:30 ,
        hight:30 ,
        justifyContent:"center" ,
        alignItems: "center",
        borderRadius: 10 ,
        padding: 5 ,
    },categoryContainer:{
        width:"70%",
        flexDirection:"column",
        marginLeft:10
    },name:{
        fontSize: 19
    },count:{
        fontSize: 14,
        color:"rgb(100,100,100)"
    },shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
});
