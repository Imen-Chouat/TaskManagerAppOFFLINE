import React, {useState , useEffect } from "react";
import * as Progress from "react-native-progress" ;
import Icons from "../constants/Icons";
import { Image } from "expo-image";
import { StyleSheet , Text , View ,Pressable} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "expo-router";
const colors = [
        ["#DE3163","#ffabc3ff"],
        ["#40E0D0","#9cf0e7ff"], 
        ["#CCCCFF","#8181d4ff"],
        ["#c9aeffff","#8372a7ff"],
        ["#f0d2e1ff","#cc70a0ff"],
        ["#c2cf6cff","rgba(133, 148, 40, 1)"],
        ["#ffd1afff","#FF9142"],   
        ["#b69a33ff","#FFD12E"] ,
];
let colorO ;
let index = 0 ;
export default function ProjectCard({project , onPress}){
    const navigator = useNavigation(); 
    index = project.id % colors.length ;
    const color = colors[index];
    colorO = color[1] ;
    useEffect(()=>{
        
    },[]);
    return(
    <Pressable onPress={async()=>{
        onPress();
        //console.log(project);
        await SecureStore.setItemAsync("project",JSON.stringify(project));
    }} style={{minWidth:"93%" , maxWidth: "93%" , marginBottom: 12 }}>
    <View style={[styles.projectContainer,{ backgroundColor: `${colorO}` }]}>
        <View style={styles.categoryContainer}>
            <Text style={styles.categoryName}>{project.category.name}</Text>
            <View style={[styles.iconWraper,{backgroundColor:`${color[0]}`}]}>
                <Image source={Icons[project.image]} style={{width:40,height:40}} />
            </View>
        </View>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.dateText} >from : {project.start_date}</Text>
        <Text style={styles.dateText} >to : {project.end_date}</Text>
        <View style={{flexDirection:"row" , alignItems:"center"}} >
            <Progress.Bar
            progress={project.percentage *0.01}
            width={250}
            height={9}
            color={color[0]}
            unfilledColor="#eee"
            borderWidth={0}
            borderRadius={8}
            style={styles.bar}
            />
            <Text style={styles.percentage} >{project.percentage}%</Text>
        </View>

    </View>
    </Pressable>
    );
};
const styles = StyleSheet.create({
    projectContainer:{
        margin: 5 ,
        padding : 13 ,
        borderRadius: 24 ,
        marginRight: 10 ,
        minHeight: 155 , 
        width: "100%"
    },categoryContainer:{
        flexDirection: 'row' ,
        padding:4 ,
        marginBottom: 2 , 
    },categoryName:{
        width:"86%",
        color:"rgba(255, 255, 255, 1)",
        fontWeight: '900'
    },iconWraper:{
        position:"absolute",
        top:-5,
        right:-5,
        backgroundColor:"rgba(255, 255, 255, 1)",
        alignItems: "center",
        alignSelf:"center" ,
        justifyContent:"center",
        borderRadius: 12 ,
        padding: 5
    },title:{
        marginTop:5 ,
        marginBottom:7 ,
        fontSize: 22 ,
        fontWeight: '800'
    },bar:{
        margin:10 ,
    },dateText:{
        fontWeight: "700" ,
        fontSize: 15
    },percentage:{
        fontWeight: "900" ,
        fontSize: 12 ,
        backgroundColor: "#ffffff7c" ,
        padding: 6 ,
        borderRadius: 20 , 
        paddingVertical: 9
    }
});