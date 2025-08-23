import React, { useEffect, useState } from "react";
import { View , Text, ScrollView, TouchableOpacity } from "react-native";
import * as dateService from 'date-fns';
import * as SecureStore from "expo-secure-store" ;
import ProjectsPageStyle from "../Styles/ProjectsPageStyle";
import LoadingPage from "./LoadingPage";
import TabBar from "../components/TabBar";
import ProjectFilter from "../components/ProjectFilter";
import ProjectPageCard from "../components/ProjectPageCard";
import { useNavigation } from "@react-navigation/native";
import ProjectCardSelected from "../components/ProjectCardSelected";
import dataBaseService from "../services/dataBaseService";
export default function ProjectsPage(){
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    const [type,setType] = useState("In Progress");
    const [projectsList,setProjects] = useState([
    {id:1,title:"Grocery Shop App design .",description:"The project Description",category:{name:"Personel Projects",icon: "online-test"},percentage:70,image:"online-test",start_date:"2025-07-08",end_date:"2025-08-28"},
    {id:2,title:"Grocery Shop App Implemetation .",description:"The project Description",category:{name:"Office Project",icon: "quality"},percentage:30,image:"quality",start_date:"2025-09-08",end_date:"2025-09-18"},
    {id:3,title:"Hour Shop App testing .",description:"The project Description",category:{name: "Education Tasks",icon: "mushroom"},percentage:10,image:"mushroom",start_date:"2025-07-08",end_date:"2025-08-18"},
    {id:4,title:"love island critisizing .",category:{name:"Daily Tasks",icon: "spaghetti"},percentage:90,
  image:"spaghetti",start_date:"2025-07-08",end_date:"2025-08-18"},
    {id:5,title:"Grocery Shop App design .",category:{name:"Personel Projects",icon: "workout"},percentage:70,
  image:"workout",start_date:"2025-07-08",end_date:"2025-08-18"},
    {id:6,title:"Grocery Shop App Implemetation .",category:{name:"Office Project",icon: "website"},percentage:30,
  image:"website",start_date:"2025-07-08",end_date:"2025-08-18"},
    {id:7,title:"Hour Shop App testing .",category:{name: "Education Tasks",icon: "party-hat"},percentage:10,
  image:"party-hat",start_date:"2025-07-08",end_date:"2025-08-18"},
    {id:9,title:"love island critisizing .",category:{name:"Daily Tasks",icon: "gamer"},percentage:90,
  image:"gamer",start_date:"2025-07-08",end_date:"2025-08-18"},
    ]);

    const [filtered,setFiltered] = useState([]);
    const [selectedProject,setSelected] = useState(null);
    const navigator = useNavigation();
    const checkProjectType = (project,type) => {
        if(type == "All" ) return true ;
        try {
            const today = new Date();
            const start = new Date(project.start_date);
            const end = new Date(project.end_date);
            if(dateService.isBefore(today,start)){
                return type == "Comming";
            }
            if(dateService.isAfter(today,start) && dateService.isBefore(today,end) ){
                return type == "In Progress";
            }
            if(dateService.isAfter(today,end)){
                return type == "Past" ;
            }
            
        } catch (error) {
            console.error("Error figuring the project type in the projects page :",error);
        }
    }

    const handleFilter = (type) => {
        if(type == "All"){
            setFiltered(projectsList);
        }else{
            setFiltered(getTypeProjects(type));
        }
    }

    const getTypeProjects = (type) => {
            let result = [] ;
            projectsList.map((project) => {
                if(checkProjectType(project,type)) result.push(project);
            })
            return result || [] ;
    }
    
    const handleCreate = async () => {
        navigator.navigate("AddProjectPage","create");
    }

    const fetchDate = async () => {
        try {
            const userFetched = JSON.parse( await SecureStore.getItemAsync("user") );
            setUser(userFetched);
            const projectsFetched = await dataBaseService.getProjects(userFetched.id);
            setProjects(projectsFetched);
            handleFilter("In Progress");
        } catch (error) {
            console.error("Error fetching the data for the projects page :",error);
        }finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        fetchDate();
    },[]);
    return(
        (loading) ? (
            <LoadingPage/>
        ):(
        <View style={styles.container} >
            <Text style={styles.pageTitle} >Welcome to your projects Space!</Text>
            <ProjectFilter onPress={(tab) => {setType(tab),handleFilter(tab);}} />
            <View>
                <TouchableOpacity style={styles.createButton} onPress={ () => { handleCreate() }} >
                    <Text style={styles.createText} >Create new Project</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
            style={styles.mainScroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            >
                {
                    filtered.map((project)=>(
                        selectedProject == project ? (
                        <ProjectCardSelected project={project} key={project.id} onClose={()=>{setSelected(null)}} />
                        ):(
                        <ProjectPageCard project={project}key={project.id} onPress={async ()=>{ setSelected(project)}} />
                        )

                    ))
                }
            </ScrollView>
            <TabBar/>
        </View>
        )
    );
}

const styles = ProjectsPageStyle ;