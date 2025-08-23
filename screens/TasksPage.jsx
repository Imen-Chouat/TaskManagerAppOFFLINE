import React ,{useState , useEffect} from "react";
import { View , Text, ScrollView , Image, TouchableOpacity, Modal, TextInput} from "react-native";
import CalendarStrip from "../components/CalendarStrip"
import TabBar from "../components/TabBar"
import TasksPageStyle from "../Styles/TasksPageStyle";
import TaskFilter from "../components/TaskFilter";
import TaskPageCard from "../components/TaskPageCard";
import TaskPageSelected from "../components/TaskPageSelected";

export default function TasksPage(){
    const [day,setDay] =useState(new Date());
    const [createModal,setCreateVisibility] = useState(false);
    const [todayTasks,setTodayTasks] = useState([
        {id:1,title:"Today task",category:{name:"random" ,icon:"airplane"},icon:"airplane",state:"Done",date:"2025-08-13",time:"07:23"} ,
        {id:2,title:"Today task",category:{name:"random" ,icon:"book"},icon:"book",state:"To-do",date:"2025-08-13",time:"07:23"} , 
        {id:3,title:"Today task",category:{name:"random" ,icon:"night"},icon:"night",state:"In Progress",date:"2025-08-13",time:"07:23"} , 
        {id:4,title:"Today task",category:{name:"random" ,icon:"night"},icon:"night",state:"Missed",date:"2025-08-13",time:"07:23"}
    ]);
    const [filteredTasks,setFilteredTasks] = useState([
        {id:1,title:"Today task",category:{name:"random" ,icon:"airplane"},icon:"airplane",state:"Done",date:"2025-08-13",time:"07:23"} ,
        {id:2,title:"Today task",category:{name:"random" ,icon:"book"},icon:"book",state:"To-do",date:"2025-08-13",time:"07:23"} , 
        {id:3,title:"Today task",category:{name:"random" ,icon:"night"},icon:"night",state:"In Progress",date:"2025-08-13",time:"07:23"} , 
        {id:4,title:"Today task",category:{name:"random" ,icon:"night"},icon:"night",state:"Missed",date:"2025-08-13",time:"07:23"}
    ]);
    
    const [selected,setSelected] = useState(null);
    const [type, setType]= useState("All");
    const handleDateChange = (dateString) => {
        console.log("Selected date:", dateString);
        const date = new Date(dateString);
        setDay(date);
        // Fetch tasks for selected date
    };

    const handlePress = (typ)=>{
        setType(typ);
        console.log(typ,type);
        let tasks = todayTasks ;
        if(typ != "All"){
           tasks = todayTasks.filter(task => task.state == typ);
        }
        setFilteredTasks(tasks);
    }
    const renderEmptyTasks = () => {
        let message = "" ;
        let imageSource = null ;
        let today = new Date();
        let isToday = day.getDate() == today.getDate() && day.getMonth() == today.getMonth() && today.getFullYear() == day.getFullYear() ;
        if(type == "All"){
            message=isToday ? "No tasks yet, let start new one together !" : "There are no tasks in these date !";
            imageSource= require("../assets/images/allEmpty.png");
        }else{
            message=isToday ? `No ${type} tasks yet. Let start one together!`: `No ${type} tasks in these date`;
            switch (type) {
                case "Done":
                    imageSource = require("../assets/images/doneEmpty1.png");
                    break;
                case "To-do":
                    imageSource = require("../assets/images/todoEmpty.png");
                    break;
                case "Missed":
                    imageSource = require("../assets/images/missedEmpty.png");
                    break;
                case "In Progress":
                    imageSource= require("../assets/images/inprogressEmpty.png");
                    break;
            }
        }
        return(
        <View style={styles.emptyContainer}>
            <Image source={imageSource} style={styles.emptyImage} />
            <Text style={[styles.emptyMessage,{color:"hsla(90, 5%, 8%, 0.97)"}]}>{message}</Text>
        </View>);
    }
    useEffect(()=>{

    },[]);
    return(
        <View style={styles.container}>
            <ScrollView   style={styles.scroll}
            contentContainerStyle={[{paddingBottom: filteredTasks.length == 0 ? 0 : 124 }]}
            showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Today's Tasks</Text>
                <CalendarStrip onDateSelect={handleDateChange} style={styles.calendarStrip}/>
                <TaskFilter onPress={handlePress} style={styles.filter}/>
                <View>
                {
                    filteredTasks.length == 0 ? (
                        renderEmptyTasks()
                    ) : (
                        filteredTasks.map((task)=>(
                            (task == selected) ? (
                                <TaskPageSelected task={task} key={task.id} onPress={()=>{setSelected(null)}} />
                                
                            ):(
                            <TaskPageCard task={task} key={task.id} onPress={()=>{setSelected(task)}} />
                            )
                        ))  
                    )
                }
                </View>
            </ScrollView>
            <TouchableOpacity onPress={()=>{setCreateVisibility(true)}}>
                <Text>+</Text>
            </TouchableOpacity>
            <Modal>
                <View style={styles.createModalBackground}>
                    <View style={styles.createModalContent} >
                        <TextInput  />
                    </View>
                </View>
            </Modal>
            <TabBar/>
        </View>
    );
}

const styles = TasksPageStyle ;