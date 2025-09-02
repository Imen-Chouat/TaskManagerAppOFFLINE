import React, { useEffect, useState } from "react";
import { StyleSheet , View , TouchableOpacity , Modal , TextInput, FlatList , Alert ,Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icons from "../constants/Icons";
import { Image } from "expo-image";
import dataBaseService from "../services/dataBaseService"
export default function TaskEditModal({task,visible,onClose}){
    const [title,setTitle] = useState(null);
    const [state,setState] = useState(null) ;
    const [date,setDate] = useState(new Date());
    const [time,setTime] = useState(null);
    const [icon,setIcon] = useState(null);
    const [pickDateVisible,setDateVisibility] = useState(false);
    const [pickTimeVisible,setTimeVisibility] = useState(false);
    let states = task.state == "To-do" || task.state === "Done" ? ["To-do","In Progress","Done"] : task.state == "Missed" ?  ["Missed"] : ["In Progress","Done"]; 
    const checkUpdate = () => {
        let result = {
            title: null,
            state: null,
            date: null,
            time: null,
            icon: null,
            project: null
        };

        const testDate = new Date(task.date);
        const testTime = new Date(`${task.date}T${task.time}`);

        if (
            title === task.title &&
            state === task.state &&
            date.getTime() === testDate.getTime() &&
            time.getTime() === testTime.getTime() &&
            icon === task.icon
        ) {
            return null; // nothing changed
        }

        if (title !== task.title) result.title = title;
        if (state !== task.state) result.state = state;
        if (date.getTime() !== testDate.getTime()) result.date = date.toISOString().split("T")[0];
        if (time.getTime() !== testTime.getTime())
            result.time = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        if (icon !== task.icon) result.icon = icon;

        return result;
    };

    const handleEdit = async (newTask) => {
        try {
            console.log(newTask);
            const updated = await dataBaseService.updateTask(task.id,newTask);
            console.log("lol",updated);
            onClose();
        } catch (error) {
            console.error("Eroor updating the tasks info!");
        }
    }
    const handlePressEdit = async () => {
        const checked = checkUpdate();
        if(!checked) {
            Alert.alert("No update done","You should update one of the tasks informations first!");
            return;
        }
        try {
            
            Alert.alert("Confirmation",`Are you sure you want to update this task`,[{
                text: "Yes",
                onPress: async ()=>{
                    await handleEdit(checked);
                },
            },{
                    text:"no" ,
                    onPress: ()=>{
                        console.log("No")
                        return;
                    }
            }])
        } catch (error) {
            console.error("Error alterting the edit task :",error);
        }
    }
    useEffect(()=>{
        setTitle(task.title);
        setDate(new Date(task.date));
        setTime(new Date(`${task.date}T${task.time}`));
        setIcon(task.icon);
        setState(task.state);

    },[]);
    return(
        <Modal
        visible={visible}
        animationType="slide" 
        transparent={true}
        onRequestClose={() => onClose()}
        >
            <View style={styles.modalBackground}>
            <View style={styles.modalContent} >
                
                <Text style={styles.modalTitle}>Manage your task !</Text>
                <Text style={styles.titleIn} >Change the title :</Text>
                <TextInput value={title} onChangeText={(text) => setTitle(text.trim())} placeholder="Please Enter the Task title here" style={styles.title} />

                <View style={{flexDirection:"row" , justifyContent: "center" , alignItems: "center" ,
                     marginVertical: 10}}>
                    <Text style={{fontSize:17 , fontWeight:"800"}} >State : </Text>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={states} 
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity style={item == state ? [styles.selecedState,styles.state] : [styles.state]} 
                            onPress={()=>{setState(item)}}>
                                <Text style={item === state ?{ fontWeight:"800" , fontSize: 16 , color: "#ffffffff"} : styles.stateText } >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    />
                </View>
                
                <View style={{marginVertical: 10 , flexDirection:"row",alignItems:"center" }}>
                    <Text style={styles.dateChoice} >Pick a date :</Text>
                    <TouchableOpacity style={styles.datePicker} onPress={()=>{setDateVisibility(true)}}>
                        <Text style={styles.date} >{date ? date.toLocaleDateString() : "Pick a date"}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                    isVisible={pickDateVisible}
                    mode="date"
                    onConfirm={(pickedDate)=>{setDate(pickedDate); setDateVisibility(false)}}
                    onCancel={()=> setDateVisibility(false)}
                    />
                </View>


                <View style={[{marginVertical: 10 , flexDirection:"row",alignItems:"center" }]}>
                    <Text style={styles.timeChoice}>Pick a Time :</Text>
                    <TouchableOpacity style={styles.timePicker} onPress={()=>{setTimeVisibility(true)}}>
                        <Text style={styles.time} >{time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Pick a time"}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                    isVisible={pickTimeVisible}
                    mode="time"
                    onConfirm={(pickedTime)=>{setTime(pickedTime);setTimeVisibility(false)}}
                    onCancel={()=>{setTimeVisibility(false)}}
                    />
                </View>

                <Text style={{fontSize: 16 , fontWeight: "700" , alignSelf: "center" , color:"#005b80ff"}} >Click to change the Task icon</Text>
                <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{backgroundColor:"#142a8d67" , padding: 5 , paddingBottom: 45 , marginVertical:10 , borderRadius:14}}
                numColumns={4} 
                data={Object.entries(Icons)}
                keyExtractor={([key]) => key}
                renderItem={({item}) => {
                    const [key,src] = item ;
                    return(
                    <TouchableOpacity onPress={() =>setIcon(key)}
                    style={ key == icon ? [styles.iconWraper,styles.selectedWraper]: [styles.iconWraper,{backgroundColor:"#fff"}]} >
                        <Image source={src} style={styles.icon} />
                    </TouchableOpacity>
                    );
                }}
                />

                <View style={{flexDirection:"row" , justifyContent:"space-around"}} >
                <TouchableOpacity style={[styles.button,styles.editButton]} onPress={() => {handlePressEdit();}} >
                    <Text style={styles.buttonText} >Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,styles.deleteButton]}  onPress={onClose}>
                    <Text style={styles.buttonText} >Cancel</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({
    container:{

    },modalBackground:{
        backgroundColor:"#0000001e" ,
        flex: 1 
    },modalContent:{
        backgroundColor: "#ffecfdff" ,
        padding: 15 ,
        marginVertical: 25 ,
        height: "90%" ,
        borderRadius: 40 ,
        marginHorizontal: 15 ,
        color: "#73467eff"
    },modalTitle:{
        alignSelf: "center" ,
        marginBottom: 5 ,
        fontSize: 19 ,
        fontWeight: "bold" ,
        color: "#cc41c5ff"
    },titleIn:{
        margin: 6 ,
        fontSize: 16 ,
        color: "#000000ff" ,
        fontWeight: 700
    },title:{
        padding: 10 ,
        borderRadius: 15 ,
        borderWidth: 1.2 ,
        borderColor: "rgba(42, 83, 49, 1)" ,
        fontSize: 16 ,
        fontWeight: "700"  ,
        marginBottom : 10 ,
        color: "rgba(44, 65, 48, 1)"  ,
        backgroundColor: "#ffffffff"
    },selecedState:{
        backgroundColor:"#b85bb8ff" ,
        borderColor: "#4b694bff"
        
    },state:{
        paddingHorizontal : 7 , 
        paddingVertical: 5 ,
        marginRight: 5 ,
        borderWidth : 1 ,
        borderRadius: 10 ,
        borderColor: "#b85bb8ff" 
    },stateText:{
        color: "#b85bb8ff" ,
        fontWeight: "800" ,
        fontSize: 16
    },dateChoice:{
        marginRight: 10 , 
        fontWeight: "700" , 
        color: "#000000ff" ,
        fontSize: 16
    },datePicker:{
        backgroundColor: "#fff" ,
        borderRadius:6 ,
    },date:{
        fontSize:15,
        fontWeight:"700" ,
        color:"#00c3ffff" ,
        borderWidth:1.5 ,
        padding:2 ,
        paddingHorizontal:8 ,
        borderRadius:6 ,
        borderColor:"#00c3ffff" ,
        fontWeight: "bold" 
    },timeChoice:{
        marginRight: 10 ,
        fontWeight: "700" ,
        color: "#000000ff" ,
        fontSize: 16 ,
    },timePicker:{
        backgroundColor: "#fff" ,
        borderRadius:6 ,
    },time:{
        fontSize:15,
        fontWeight:"700" ,
        color:"#ff9900ff" ,
        borderWidth:1.5 ,
        padding:2 ,
        paddingHorizontal:8 ,
        borderRadius:6 ,
        borderColor:"#ff9900ff" ,
        fontWeight: "bold"
    },taskIcon:{

    },selectedWraper:{
        backgroundColor:"#005b80ff"
    },iconWraper:{
        margin: 5 ,
        padding: 5 ,
        borderRadius: 15
    },icon:{
        width: 53 ,
        height: 53
    },button:{
        padding: 8 ,
        paddingHorizontal: 20 ,
        borderRadius: 19
    },editButton:{
        backgroundColor: "rgba(169, 255, 10, 1)" ,
    },deleteButton:{
        backgroundColor: "rgba(150, 231, 255, 1)" ,
    },buttonText:{
        fontSize: 16 ,
        fontWeight: "700" ,
        color: "#2c1e1eff"
    }
});