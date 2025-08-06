// src/screens/Home.js
import React , { useState , useEffect, use } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert ,Pressable} from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import * as SecureStore from 'expo-secure-store';
import TabBar from '../components/TabBar';
import HomeStyle from '../Styles.js/HomeStyle';
import ViewHomeButton from '../components/elements/ViewHomeButton';
import CategoryCard from '../components/CategoryCard';
import LoadingPage from './LoadingPage';
import ProjectCard from '../components/ProjectCard';
import CreateCaategoryButton from '../components/elements/CreateCategoryButton';
import databaseService from '../services/dataBaseService' ;
export default function Home() {
  const [user,setUser]=useState(null);
  const [taskList,setTaskList] = useState([]);
  const [projectList,setProjectList] = useState([]);
  const [percentage,setPercentage] = useState(-1);
  const [categories,setCategories] = useState([]);
  const [loading,setLoading] = useState(true);
  const profileUrl = SecureStore.getItemAsync("profileUrl") || "../assets/images/profile.png";
  const navigation = useNavigation();
  const fetchProjects = async ()=>{
    try {
      const userSt = await SecureStore.getItemAsync("user");
      const parsed = JSON.parse(userSt);
      const fetched = await databaseService.getOngoingProjects(parsed.id);
      setProjectList(fetched);
    } catch (error) {
      console.error("Error fetching the projects",error);
      Alert.alert("Error","Error fetching the projects for this user");
    }

  }
  const fetchCategories = async () => {
    try {
      const userS = await SecureStore.getItemAsync("user");
      const userParsed = JSON.parse(userS);
      const fetced = await databaseService.getUserCategories(userParsed.id);
    } catch (error) {
      console.error("Error fetching the categories !",error);
      Alert.alert('Error',"Error getting the user categories.");
    }
  }
  const fetchData = async () => {
    const userSt = await SecureStore.getItemAsync("user");
    console.log(userSt);
    setUser(JSON.parse(userSt));
    //await fetchProjects();
    //await fetchCategories();
    if(user && projectList && categories) setLoading(false);
  }
  useEffect( ()=>{
    fetchData();
  },[]);
  return (
    (user && projectList && categories ) ?  (
      <View style={styles.container}>
      <ScrollView 
          style={styles.mainScroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <Pressable onPress={()=>{
            console.log("pressed"); 
            navigation.navigate('ProfilePage')  }} >
            <Image source={require('../assets/images/profile.png')} style={styles.profileImage}/>
          </Pressable>

          <View style={styles.welcomeBlock}>
            <Text style={styles.helloText}>Hello!</Text>
            <Text style={styles.userName}>{user.user_name}</Text>
          </View>
          <Icon name={"home"} style={styles.profileIcon} size={24}/>
        </View>

        <View style={styles.percentageBlock}>
          <View style={styles.viewBlock} >
            <Text style={styles.pencentageText}>Your Today's task almost done</Text>
            <ViewHomeButton text={"View Tasks!"}/>
          </View>
          <View style={styles.circleContainer}>
          <Progress.Circle
          style={styles.circle} progress={0.85} size={100} thickness={10} borderWidth={0} color="#ffa65dff" 
          unfilledColor="#EEE9FF" showsText={true} textStyle={styles.circleText} formatText={() => '85%'}/>
          </View>
        </View>

        <View style={{flexDirection:"row"}}>
          <Text style={styles.projectAnnounce}>Projects On Progress</Text>
          <View style={styles.countView}>
            <Text style={styles.count}>{projectList.length}</Text>
          </View>
        </View>

          { projectList.length == 0 ? (
            <View style={{minHeight: 170 , flexDirection:"column",justifyContent:"center", alignItems:"center",backgroundColor:"rgba(78, 100, 197, 0.12)" , padding:5 , marginHorizontal:20 ,borderRadius:23}}>
              <Image source={require("../assets/gif/noProject.gif")} style={{width:190,height:180 , marginBottom:-15,marginTop:-23}} />
              <Text style={{marginBottom:10,fontWeight:"bold",fontSize:20,color:"rgba(4, 38, 148, 1)"}} >No projects available yet</Text>
            </View>
          ) : (         
            <View style={{minHeight: 170}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.projectsScroll} >
                {
                  projectList.map((project)=>(
                    <ProjectCard project={project} key={project.id} />
                  ))
                }
                </ScrollView>
            </View>)
          }

        <View style={styles.taskSlide}>
          <View style={{flexDirection:"row"}}>
            <Text style={styles.taskAnnounce}>Task groups </Text>
            <View style={styles.countView}>
                <Text style={styles.count}>{categories.length}</Text> 
            </View>
          </View>
          <CreateCaategoryButton title="Create Category!" onPress={()=>{}}/>
        </View>
        
        {categories.length == 0 ? (
          <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Image source={require("../assets/gif/noCategory.gif")} style={{width:190,height:120}}/>
            <Text style={{fontWeight:"bold",fontSize:16}} >No categories found , create new one!</Text>
          </View> ) : (
          <View style={styles.tasksList}>
            { categories.map((category)=>(
              <CategoryCard category={category} key={category.id} />
            ))
            }
          </View>
        )}
      </ScrollView>
      <TabBar/>
      </View>      
    ) : (
      <LoadingPage/>
    )
  );
}

const styles = HomeStyle ;
/*

      <Text>In Progess <Text>{projectList.length}</Text></Text>
      <ScrollView style={styles.projectsList}>

      </ScrollView>
      <View>
      <Text> Task groups -by category- </Text>
      <Button title="Create Category!"/>
      </View>
      <ScrollView style={styles.tasksList}>
        { categories.map((category,index)=>(
          <CategoryCard category={category} key={index} />
        ))
        }
      </ScrollView>
          {id:1,title:"Grocery Shop App design .",category:{name:"Personel Projects",icon: "clipboard"},percentage:70},
    {id:2,title:"Grocery Shop App Implemetation .",category:{name:"Office Project",icon: "cube"},percentage:30},
    {id:3,title:"Hour Shop App testing .",category:{name: "Education Tasks",icon: "book"},percentage:10},
    {id:4,title:"love island critisizing .",category:{name:"Daily Tasks",icon: "home"},percentage:90},
    {id:5,title:"Grocery Shop App design .",category:{name:"Personel Projects",icon: "clipboard"},percentage:70},
    {id:6,title:"Grocery Shop App Implemetation .",category:{name:"Office Project",icon: "cube"},percentage:30},
    {id:7,title:"Hour Shop App testing .",category:{name: "Education Tasks",icon: "book"},percentage:10},
    {id:9,title:"love island critisizing .",category:{name:"Daily Tasks",icon: "home"},percentage:90},
    //categories 
      {id:1,name:"Daily Tasks",icon: "home"},  
  {id:2,name: "Education Tasks",icon: "book"},
  {id:3,name:"Office Project",icon: "cube"},
  {id:4,name:"Personel Projects",icon: "clipboard"},
  {id:5,name:"Personel Projects",icon: "clipboard"},
  {id:10,name:"Daily Tasks",icon: "home"},  
  {id:6,name: "Education Tasks",icon: "book"},
  {id:7,name:"Office Project",icon: "cube"},
  {id:8,name:"Personel Projects",icon: "clipboard"},
  {id:9,name:"Personel Projects",icon: "clipboard"}
 */