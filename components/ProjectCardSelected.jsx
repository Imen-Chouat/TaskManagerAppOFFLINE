import React, {useState , useEffect } from "react";
import * as Progress from "react-native-progress" ;
import Icons from "../constants/Icons";
import { Image } from "expo-image";
import { StyleSheet , Text , View ,Pressable, TouchableOpacity} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "expo-router";
import dataBaseService from "../services/dataBaseService";

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
export default function ProjectCard({project,onClose}){
    const navigator = useNavigation(); 
    index = project.id % colors.length ;
    const color = colors[index];
    colorO = color[1] ;
    const handleDelete = async () => {
        try {
            const result = await dataBaseService.deleteProject(project.id);
            return result ;
        } catch (error) {
            console.error(`Error deleting =${project.title}:`,error);
        }
    }
    return(
    <Pressable onPress={async()=>{
        console.log(project);
        await SecureStore.setItemAsync("project",JSON.stringify(project));
        onClose();
    }} style={{minWidth: "93%" , maxWidth:"93%" , marginBottom: 14 }} >
    <View style={[styles.projectContainer,{ backgroundColor: "rgb(100,0,0)" }]}>
        <View style={styles.categoryContainer}>
            <Text style={styles.categoryName}>{project.category.name}</Text>
            <View style={[styles.iconWraper,{backgroundColor:"rgb(1,0,0)"}]}>
                <Image source={Icons[project.image]} style={{width:40,height:40 }} />
            </View>
        </View>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.dateText} >from : {project.start_date}</Text>
        <Text style={styles.dateText} >to : {project.end_date}</Text>
        <View style={{flexDirection:"row" , alignItems:"center"}} >
            <Progress.Bar
            progress={project.percentage*0.01}
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

        <View style={{flexDirection: "row" , justifyContent:"space-around" , marginTop: 10}} >
            <TouchableOpacity onPress={ async ( ) => {
                await SecureStore.setItemAsync("project",JSON.stringify(project));
                navigator.navigate("AddProjectPage",{type:"edit"});
            } } style={[styles.editInfoButton ,  styles.button ]}>
                <Text style={styles.buttonText} >Edit Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ async () => {
                await SecureStore.setItemAsync("project",JSON.stringify(project));
                navigator.navigate("ProjectInfoPage");
            } } style={[styles.editTasksButton ,  styles.button ]} >
                <Text style={styles.buttonText} >Edit tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ async () => {
                onClose();
                await handleDelete();
            } } style={[styles.deleteButton , styles.button]} >
                <Text style={styles.buttonText} >Delete</Text>
            </TouchableOpacity>
        </View>

    </View>
    </Pressable>
    );
};
const styles = StyleSheet.create({
    projectContainer:{
        alignSelf: "flex-start" ,
        margin: 5 ,
        padding : 13 ,
        borderRadius: 25 ,
        marginRight: 10 ,
        minHeight: 155 ,
        width: "100%" , 
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
        fontWeight: '800' ,
        color: "#fff"
    },bar:{
        margin:10 ,
        
    },button:{
        padding: 10 ,
        borderRadius: 20 ,
        paddingHorizontal: 16
    },editInfoButton:{
        backgroundColor:"#95ff95ff"
    },editTasksButton:{
        backgroundColor:"#90fbffff"
    },deleteButton:{
        backgroundColor:"#ff6e7aff"
    },buttonText:{
        fontWeight: "900" ,
        fontSize: 15 ,
        color: "#000000ff"
    },dateText:{
        color: "#fff" ,
        fontSize: 15 ,
        fontWeight: "700"
    },percentage:{
        fontWeight: "900" ,
        fontSize: 12 ,
        backgroundColor: "#ffffff7c" ,
        padding: 6 ,
        borderRadius: 20 , 
        paddingVertical: 9
    }
});