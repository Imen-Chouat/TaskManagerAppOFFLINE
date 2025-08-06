import React, { useActionState, useEffect }  from "react";
import TabBar from "../components/TabBar";
import { View ,ScrollView , Text} from "react-native";
import { useState } from "react";
import CalenderPageStyle from "../Styles.js/CalenderPageStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import dayjs from 'dayjs';
import { LinearGradient } from "expo-linear-gradient";
import TaskCardCalender from "../components/TaskCardCalender";
export default function CalenderPage() {
    const [selectedDate,setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [tasksCount,setTaskConut] = useState(0);
    const [projectsCount,setProjectsCount] = useActionState(0);
    const [done,setDone] = useState(0);
    const [todo,setToDo] = useState(0);
    const [taskList,setTaskList] = useState([]);
    useEffect(()=>{
        setTaskList([
            {title:"task1",state:"Done",time:"07:00",underProject:true},
            {title:"taskdizuedizehduezhdiez2",state:"Ongoing",time:"08:00",underProject:true},
            {title:"task3",state:"Missed",time:"10:00",underProject:false},
            {title:"task4",state:"Coming",time:"19:00",underProject:true},
            {title:"task1",state:"Ongoing",time:"07:00",underProject:false},
            {title:"task2",state:"Missed",time:"08:00",underProject:false},
            {title:"task3",state:"Done",time:"10:00",underProject:true},
            {title:"task4",state:"Coming",time:"19:00",underProject:true},
            {title:"task1",state:"Done",time:"07:00",underProject:true},
            {title:"task2",state:"Done",time:"08:00",underProject:true},
            {title:"task3",state:"Done",time:"10:00",underProject:true},
            {title:"task4",state:"Done",time:"19:00",underProject:true},
            {title:"task1",state:"Done",time:"07:00",underProject:true},
            {title:"task2",state:"Done",time:"08:00",underProject:true},
            {title:"task3",state:"Done",time:"10:00",underProject:true},
            {title:"task4",state:"Done",time:"19:00",underProject:true},
            {title:"task1",state:"Done",time:"07:00",underProject:true},
            {title:"task2",state:"Done",time:"08:00",underProject:true},
            {title:"task3",state:"Done",time:"10:00",underProject:true},
            {title:"task4",state:"Done",time:"19:00",underProject:true},
            {title:"task1",state:"Done",time:"07:00",underProject:true},
            {title:"task2",state:"Done",time:"08:00",underProject:true},
            {title:"task3",state:"Done",time:"10:00",underProject:true},
            {title:"task4",state:"Done",time:"19:00",underProject:true},
            {title:"task1",state:"Done",time:"07:00",underProject:true},
            {title:"task2",state:"Done",time:"08:00",underProject:true},
            {title:"task3",state:"Done",time:"10:00",underProject:true},
            {title:"task4",state:"Done",time:"19:00",underProject:true}
        ]);
    },[]);
    const onDayPress = (day)=>{
        setSelectedDate(day.dateString);    
    };
    const markedDates = {
        [selectedDate]: {
        selected: true,
        selectedColor: 'orange',
        selectedTextColor: 'white',
        },
    };

    return (
        <LinearGradient colors={['rgba(188, 173, 204, 1)', 'rgba(135, 135, 175, 1)rgba(192, 222, 240, 1)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
        {/* Calendar Top Part */}
        <Calendar
            style={styles.calender}
            onDayPress={onDayPress}
            markedDates={markedDates}
            enableSwipeMonths={true}
            theme={{
            todayTextColor: 'orange',
            selectedDayBackgroundColor: 'orange',
            arrowColor: 'orange',
            }}
        />

        {/* Bottom Part: Tasks + Projects */}
        <View style={styles.subContainer}>
            <Text style={styles.title}>Todays Tasks :</Text>
            <View style={styles.containerScroll} >
                <ScrollView style={styles.bottom}>
                    {
                        taskList.map((task,index)=>(
                            <TaskCardCalender task={task} key={index}/>
                        ))
                    }
                </ScrollView>
            </View>
            <TabBar style={{}}/>
        </View>
        </LinearGradient>
    );
};
const styles = CalenderPageStyle ;