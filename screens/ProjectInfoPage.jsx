import React, { useEffect, useState } from "react" ;
import { ScrollView , TouchableOpacity, View  , Text } from "react-native" ;
import { Image } from "expo-image" ;
import * as SecureStore from "expo-secure-store" ;
import { useNavigation } from "expo-router" ;
import dataBaseService from "../services/dataBaseService" ;
import Icons from "../constants/Icons" ;
import ProjectInfoStyle from "../Styles/ProjectInfoStyle" ;
import LoadingPage from "./LoadingPage" ;
import TabBar from "../components/TabBar" ;
import TaskPageCard from "../components/TaskPageCard" ;
import TaskPageSelected from "../components/TaskPageSelected" ;
import * as Progress from "react-native-progress" ;

export default function ProjectInfoPage (){
    const [project,setProject] = useState();
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    const [tasksList,setTasksList] = useState([]);
    const [selectedTask,setSelected] = useState(null);
    const navigator = useNavigation();
    const getProjectTasks = async ( ) => {
        try {
            const tasksFetched = await dataBaseService.getProjectTasks(project.id);
            setTasksList(tasksFetched);
        } catch (error) {
            console.error("Error getting the project tasks : ",error);
        }
    }
    const fetchData = async () => {
        try {
            const projectFetched = await SecureStore.getItemAsync("project");
            console.log(projectFetched)
            setProject(JSON.parse(projectFetched));
            const userFetched = await SecureStore.getItemAsync("user");
            const userParsed = JSON.parse(userFetched);
            setUser(userParsed);
        } catch (error) {
            
        }finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
        fetchData();
    },[]);

    return(
        (loading) ? (
            <LoadingPage/>
        ):(
            <ScrollView style={styles.container} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            >
                <TouchableOpacity style={styles.arrowBlock} onPress={()=>{navigator.goBack()}}>
                    <Image source={require("../assets/icon/emptyLeftArrow.png")} style={styles.leftArrow} contentFit="contain" />
                </TouchableOpacity>
                <Text style={styles.pageTitle} >Manage Your Project</Text>
                <View style={styles.infoBlock}>

                    <Image source={project.image} />
                    <Text>Title: {project.title}</Text>
                    <Text>Category: {project.category.name}</Text>
                    <Progress.Circle
                    progress={0.8} size={15} showsText={true} color="#a85050" thickness={1} borderWidth={0} 
                    textStyle={{color : "#a85050", fontWeight: '800',fontSize:10 , textAlign:"center"}} 
                    formatText={ ()=>`${Math.round(project.percentage*100)}%`} unfilledColor="#eee"
                    />
                </View>
                <View style={styles.tasksList}>
                    {
                    tasksList.map((task)  => (
                        selectedTask == task ? (
                            <TaskPageSelected task={task} onPress={() => { selectedTask(null) }} key={task.id}/>
                        ):(
                            <TaskPageCard task={task} key={task.id} onPress={ ( ) => { setSelected(task) } } />
                        )
                    ))
                    }
                </View>
            </ScrollView>
        )
    );

}

const styles = ProjectInfoStyle ;