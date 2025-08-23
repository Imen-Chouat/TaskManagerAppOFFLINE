import React, { useEffect, useState } from "react";
import { View ,Text , Pressable, TouchableOpacity , ScrollView} from "react-native";
import { Image } from "expo-image";
import DualBarChar from "../components/DualBatChar";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStorage from 'expo-secure-store';
import ProfilePageStyle from "../Styles/ProfilePageStyle";
import LoadingPage from "./LoadingPage";
import dataBaseService from "../services/dataBaseService";
import { format, addDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { useNavigation } from "@react-navigation/native";
export default function ProfilePage (){
    const navigator = useNavigation();
    const [user,setUser] = useState(null);
    const [Loading,setLoading] = useState(true);
    const [level,setLevel] = useState(0);
    const [week,setWeek] = useState(null);
    const [weekProgress,setWeekProgress] = useState( [
  { day: "Sat", completedTasks: 5, missedTasks: 1 },
  { day: "Sun", completedTasks: 4, missedTasks: 0 },
  { day: "Mon", completedTasks: 2, missedTasks: 2 },
  { day: "Tue", completedTasks: 5, missedTasks: 1 },
  { day: "Wed", completedTasks: 1, missedTasks: 4 },
  { day: "Thu", completedTasks: 1, missedTasks: 0 },
  { day: "Fri", completedTasks: 2, missedTasks: 1 },
    ]);
    const defaultUrl = "../assets/images/profile.png" ;
    
    const fetchUser = async () => {
        const userStored = await SecureStorage.getItemAsync("user");
        setUser(JSON.parse(userStored));
    }
    const fetchLevel = async () => {
        try {
            const fetched = await SecureStorage.getItemAsync("user");
            const currentUser = JSON.parse(fetched);
            const tasksDone = await dataBaseService.getStateCount(currentUser.id,"Done");
            //Eaxh 10 done tasks gives 1 level 
            const count =Math.round(tasksDone / 10);
            setLevel(count);
        } catch (error) {
            console.error("Error fetching the user level : ",error);
        }
    }
    const uploadWeek =async () => {
        try {
            const today = new Date();
            const currentDay = format(today,"EEEE");
            const saturday = addDays(today,-((today.getDate()+1)% 7));
            const weekDays = eachDayOfInterval({
                start: saturday ,
                end: addDays(saturday,6)}).map(date => ({
                    dateObj : date ,
                    date: format(date,"yyyy-MM-dd"),
                    day : format(date,"EEEE") ,
                    isTodaye : isSameDay(today,date)
                }) );
            setWeek(weekDays) 
        } catch (error) {
            console.error("Error setting the week.");
        }
    }
    const fetchWeekProgress = async () => {
        try {
            const result = await Promise.all (
                week.map(async (theDay) => {
                const fetchedStat = await dataBaseService.getDoneTasksStatics(user.id,theDay.date);
                return ({
                    day: theDay.day ,
                    completionRatio: fetchedStat?.completionRatio*100  || 0,
                    completedTasks: fetchedStat?.completedTasks || 0,
                    missedTasks: fetchedStat?.totalTasks || 0 - fetchedStat?.completedTasks || 0,
                }
                )
            } )
            );
            setWeekProgress(result);
        } catch (error) {
            console.error("Error getting the week progress :",error);
        }
    }
    const fetchData = async () => {
        setLoading(true);
        try {
            await fetchUser();
            console.log(user);
            await fetchLevel();
            //await uploadWeek();
            //await fetchWeekProgress();
        } catch (error) {
            console.error("Error fetching the data in profile page : ",error);
        }finally{
            setLoading(false);
        }
        
    };
    useEffect(()=>{
        fetchData();
    },[]);
    const getProfile = () => {
        try {
            if(user.image == 1 ){
                console.log("first case");
                return {uri: FileSystem.documentDirectory + 'profile.png'}
            }else{
                console.log("second case");
                return require(defaultUrl);
            }
        } catch (error) {
            console.error("Error getting the profile image url .");
        }
    }

    return (
        (Loading) ? (
            <LoadingPage/>
        ) : (
            <ScrollView style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false} >
                <View style={styles.upperSide} >
                    <Pressable style={styles.goBack} onPress={()=>{navigator.goBack()}} >
                        <Image style={styles.leftArrow} source={require("../assets/icon/emptyLeftArrow.png")} contentFit="contain" />
                    </Pressable>
                    <Text style={styles.WelcomeTitle} >Welcome to your profile</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Image source={getProfile()} style={styles.profileImage}/>
                    <Text style={styles.userName} >{user.user_name}</Text>
                    <Text style={styles.level}>level {level}</Text>
                </View>

                <Text style={styles.sideTitle} >Account Informations</Text>
                <View style={{marginBottom:10}} >
                    <View style={styles.informationBlock}>
                            <Text style={styles.informationTitle} >Email: </Text>
                            <Text style={styles.information}>{user.email}</Text>
                    </View>
                    <View style={styles.informationBlock}>
                            <Text style={styles.informationTitle} >Join Date: </Text>
                            <Text style={styles.information} >{user.created_at}</Text>
                    </View>
                </View >
                <Text style={styles.sideTitle} >Utilities</Text>
                <View style={styles.utilitiesSide}>
                    <TouchableOpacity style={styles.utility}>
                        <Text style={styles.buttonText} >Edit User Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.utility}>
                        <Text style={styles.buttonText} >Log Out</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.utility}>
                       <Text style={styles.buttonText } >Delete Account</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.sideTitle} >Your week Progress</Text>
                <View style={styles.weekProgress}>
                    <DualBarChar data={weekProgress} type={"completed"} title={"completedTasks"}/>
                    <DualBarChar data={weekProgress} type={"missed"} title={"completedTasks"}/>
                </View>
            </ScrollView>
        )
    );
};

const styles = ProfilePageStyle ;