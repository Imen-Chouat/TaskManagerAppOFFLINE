import React, { useEffect, useState , useCallback} from "react";
import { View , Text, ScrollView, TouchableOpacity, SectionList } from "react-native";
import * as dateService from 'date-fns';
import * as SecureStore from "expo-secure-store" ;
import { Image } from "expo-image";
import ProjectsPageStyle from "../Styles/ProjectsPageStyle";
import LoadingPage from "./LoadingPage";
import TabBar from "../components/TabBar";
import ProjectFilter from "../components/ProjectFilter";
import ProjectPageCard from "../components/ProjectPageCard";
import { useNavigation , useIsFocused , useFocusEffect } from "@react-navigation/native";
import ProjectCardSelected from "../components/ProjectCardSelected";
import dataBaseService from "../services/dataBaseService";
export default function ProjectsPage(){
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    const [type,setType] = useState("In Progress");
    const [projectsList,setProjects] = useState([]);
    const [filtered,setFiltered] = useState([]);
    const [selectedProject,setSelected] = useState(null);
    const [categorized,setCategoriezed] = useState([]);
    const navigator = useNavigation();
    const isFocus = useIsFocused();

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

    const categorizeProjects = (list) => {
    const today = new Date();
    return {
        All: list,
        "In Progress": list.filter(p => new Date(p.start_date) <= today && new Date(p.end_date) >= today),
        Past: list.filter(p => new Date(p.end_date) < today),
        Comming: list.filter(p => new Date(p.start_date) > today),
    };
    };

    const handleFilter = (typeP) => {
        if(typeP == "All"){
            setFiltered(projectsList);
        }else{
            setFiltered(getTypeProjects(type));
        }
    }

    const getTypeProjects = (type, list = projectsList) => {
            let result = [] ;
            list.map((project) => {
                if(checkProjectType(project,type)) result.push(project);
            })
            return result || [] ;
    }
    
    const handleCreate = async () => {
        navigator.navigate("AddProjectPage",{type:"create"});
    }
    const renderEmptyProjects = () => {
        const sources = {
            "All": require("../assets/images/Projections-cuate.png"),
            "In Progress": require("../assets/images/BusinessPlan-rafiki.png"),
            "Past": require("../assets/images/Dataextraction-cuate.png"),
            "Comming": require("../assets/images/BusinessPlan-amico.png"),
        }
        const message = {
            "All": "There are no Projects yet , create One now !",
            "In Progress": "The are no Project on going in the moment , start one !",
            "Past": "There are no past projects yet , finish one !",
            "Comming": "There are no comming one yet , plan new one !", 
        }
        return(
            <View style={styles.emptyContainer} >
                <View style={styles.emptyImageWraper} >
                    <Image source={sources[type]} style={styles.emptyImage} contentFit="contain" />
                </View>
                <Text style={styles.emptyText} >{message[type]}</Text>
            </View>
        );
    }
    const fetchDate = async () => {
        try {
            const userFetched = JSON.parse( await SecureStore.getItemAsync("user") );
            setUser(userFetched);
            const projectsFetched =  await dataBaseService.getProjects(userFetched.id);
            setProjects(projectsFetched);
            console.log("mao",projectsFetched);
            const categorizedFetch = categorizeProjects(projectsFetched);
            
            setFiltered(projectsFetched);
        } catch (error) {
            console.error("Error fetching the data for the projects page :",error);
        }finally{
            setLoading(false);
        }
    }
    useFocusEffect(
        useCallback(()=>{
            fetchDate();
        },[])
    );

    return(
        (loading) ? (
            <LoadingPage/>
        ):(
        <View style={styles.container} >
 
                <Text style={styles.pageTitle} >Welcome to your projects Space!</Text>
                <ProjectFilter onPress={(tab) => {setType(tab),handleFilter(tab);}} style={{}} />
                <View style={styles.projectsList} >
                <ScrollView
                style={styles.mainScroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                >
                
                    {
                        filtered.length == 0 ? (
                            renderEmptyProjects()
                        ):(
                        filtered.map((project)=>(
                            selectedProject == project ? (
                            <ProjectCardSelected project={project} key={project.id} onClose={()=>{setSelected(null)}} onDelete={(id)=>{
                                setProjects(prev => prev.filter(p => p.id !== id));
                                setFiltered(prev => prev.filter(p => p.id !== id));

                            }} />
                            ):(
                            <ProjectPageCard project={project}key={project.id} onPress={async ()=>{ setSelected(project)}} />
                            )

                        ))
                        )
                    }
                </ScrollView>
                </View>
            <TouchableOpacity style={styles.createButton} onPress={ () => { handleCreate() }} >
                <Text style={styles.createText} >+</Text>
            </TouchableOpacity>
            <TabBar/>
        </View>
        )
    );
}

const styles = ProjectsPageStyle ;