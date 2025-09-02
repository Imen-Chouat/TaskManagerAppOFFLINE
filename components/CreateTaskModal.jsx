import React, { useState , useEffect} from "react";
import { View , Modal , Text , TouchableOpacity , TextInput ,FlatList , Alert , StyleSheet , KeyboardAvoidingView} from "react-native";
import { Image } from "expo-image";
import Icons from "../constants/Icons";
import CategorySelector from "./CategorySelector";
import databaseService from "../services/dataBaseService";
import DateTimePicker from "react-native-modal-datetime-picker"
import * as dateService from 'date-fns';
import * as SecureStore from "expo-secure-store";
export default function CreateTaskModal ({projectId , onClose , visible , user}) {
    const [title,setTitle] = useState(null);
    const [category,setCategory] = useState({});
    const [time,setTime] = useState(new Date());
    const [date,setDate] = useState(new Date());
    const [state,setState] = useState("Comming");
    const [icon,setIcon] = useState("checklist");
    const [pickerTimeVisile,setTimeVisisble] = useState(false);
    const [categories,setCategories] = useState( []);
    const [loading,setLoading] = useState(true);

    const handleDateChoice= ( pickedDate ) => {
        const today = new Date();
        if( dateService.isBefore(pickedDate,today) && !dateService.isSameDay(pickedDate,today)){
            Alert.alert("Wrong Date",`The Picked date ( ${pickedDate.toISOString().split('T')[0]} ) is before the current date ( ${today.toISOString().split('T')[0]} ) , please choose a future date !`);
            return;
        }
        setDate(pickedDate);
        if(dateService.isAfter(today,pickedDate) && ! dateService.isSameDay(pickedDate,today)) {
            setState("Comming");
            return ;
        }
        if(  dateService.isSameDay(pickedDate,today) ){
            setState("To-do");
        }
        return ;
    }
    const handleCreate = async () => {
        try {
            const message = [] ;
            if(!title) message.push("Title");
            if(!date) message.push("Date");
            if(!time) message.push("Time");
            if(!icon) message.push("Icon");
            if(!category) message.push("Category");
            if(message.length > 0 ){
                Alert.alert("Information messing !",`Please ensure to provide the task's : ${message.join(" And ")} to be able of creating this task , good luck!`);
                return ;
            }
            Alert.alert("Confiramation","Are you sure of creating this task?",[
                {
                    text: "Cancel" ,
                    style: "cancel"
                },{
                    text: "Yes!" ,
                    onPress: async () => {
                        try {
                            console.log(user.id,title,projectId,date.toISOString().split('T')[0],time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),state,category.id,icon);
                            
                            const created = await databaseService.createTask(user.id,title,projectId,date.toISOString().split('T')[0],time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),state,category.id,icon);
                            onClose();
                        } catch (error) {
                            console.error("Error creating a new task(inside the alert) : ",Error);
                        }
                    }
                }
            ])

        } catch (error) {
            console.error("Error creating a new task: ",Error);
        }
    }
    const fetchData = async () => {

        const categoriesStored = await SecureStore.getItemAsync("categories");
        const categoriesParsed = JSON.parse(categoriesStored);
        setCategories(categoriesParsed);
        console.log("edezofor")
        console.log("efuerfire",categoriesParsed);
        if(categoriesParsed.length > 0) setCategory(categoriesParsed[0]);
    }
    useEffect(()=>{
        try {
            fetchData();  
        } catch (error) {
            console.error("Error fetching the tasks page data :",error);
        }finally{
            setLoading(false);
        }
    },[]);
    return(
        <Modal style={styles.container} animationType="slide" visible={visible} transparent >
            <KeyboardAvoidingView style={styles.modalBackgorund} > 
                { loading ? (
                <View  style={{justifyContent:"center" , alignItems:"center"}}>
                    <Text>Create New task and Be happy !</Text>
                </View>
                ):(
                <View style={styles.modalContent} >
                    <Text 
                    style={styles.titlePage}>Create a new task !</Text>
                    <TextInput value={title} placeholder="Enter the task's title." onChangeText={setTitle} style={styles.titleInput} />
                    <CategorySelector categories={categories} category={category} style={styles.categorySelector} onPress={(set)=>setCategory(set)} page={"task"} />

                    <Text style={[styles.dateTitle]}>Chose your task date & time : </Text>
                    <TouchableOpacity style={styles.timePicker} onPress={() => setTimeVisisble(true)}>
                        <Text style={styles.pickerTitle} >Time : </Text>
                        <Text style={styles.pickerInfo} >{time.toLocaleTimeString([],{hour: "2-digit" , minute: "2-digit"})}</Text>
                        <DateTimePicker title="Choose your task time !" isVisible={pickerTimeVisile} onCancel={()=>setTimeVisisble(false)} mode="datetime"
                        onConfirm={(pickedTime)=>{
                        setTimeVisisble(false); handleDateChoice(pickedTime); setTime(pickedTime);
                        }} />
                        <Text style={styles.pickerTitle} >Date : </Text>
                        <Text style={styles.pickerInfo} >{date.toISOString().split('T')[0]}</Text>
                    </TouchableOpacity>

                    <Text style={styles.iconTitle}>Chose your task icon : </Text>
                    <FlatList
                    data={ Object.entries(Icons)}
                    keyExtractor={([key]) => key}
                    style={styles.flastList}
                    numColumns={5}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=> {
                        const [key,src] = item ;
                        return(
                            <TouchableOpacity style={ [styles.iconWraper ,key == icon ? styles.iconOn : styles.iconOff]} onPress={()=>setIcon(key)}>
                                <Image source={src} style={styles.taskIcon} />
                            </TouchableOpacity>
                        ); 
                    }}
                    />
                    <View style={{flexDirection:"row" , justifyContent: "space-around" , marginTop: 10 }}>
                        <TouchableOpacity onPress={onClose} style={[styles.button,styles.cancelButton]} >
                            <Text style={[styles.buttonText,styles.cancelText]} >Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCreate()} style={[styles.button,styles.createButton]} >
                            <Text style={[styles.buttonText,styles.createText]}  >Create!</Text>
                        </TouchableOpacity>
                    </View>
                </View>                    
                )
                }

            </KeyboardAvoidingView>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container:{
          
    },modalBackgorund:{
        flex: 1 ,
        backgroundColor: "#ffffff18" ,
    },modalContent:{
        height: "65%" ,
        width: "100%" ,
        backgroundColor: "#0f4ea0" ,
        position: "absolute" ,
        bottom: 0 ,
        padding: 10 ,
        borderTopEndRadius: 25 ,
        borderTopStartRadius: 25 ,
        paddingTop: 20 

    },titlePage: {
        fontSize: 18 ,
        fontWeight: "800" , 
        alignSelf: "center" , 
        marginBottom: 4 , 
        top: -8 ,
        color: "#fff"
    },titleInput:{
        backgroundColor: "#fff" ,
        borderRadius: 14 , 
        marginBottom: 10 ,
        paddingLeft: 15 , 
        fontSize: 15 , 
        fontWeight: "700"
    },categorySelector:{

    },dateTitle:{
        color: "#fff" , 
        fontSize: 16 ,
        fontWeight: "800" ,
        paddingVertical: 5 ,
        marginLeft: 5
    },timePicker:{
        flexDirection: "row" ,
        margin: 5 ,
        padding: 5 ,
        borderWidth: 1 , 
        borderRadius: 10 ,
        backgroundColor: "#ffffff5d"
    },datePicker:{
        flexDirection: "row" ,
        margin: 5 ,
        padding: 5 ,
        borderWidth: 1 , 
        borderRadius: 10 ,
        backgroundColor: "#ffffff5d"
    },pickerTitle:{
        color: "#ffffffff" ,
        fontSize: 18  ,
        marginHorizontal: 8 ,
        fontWeight: "900"
    },pickerInfo:{
        color: "#ffff00ff" ,
        fontSize: 18 ,
        fontWeight: "900"
    },iconTitle:{
        color: "#fff" , 
        fontWeight: "900" ,
        fontSize: 16 , 
        marginBottom: 8 ,
        marginLeft: 5 
    },flastList:{
        alignSelf: "center" , 
        borderWidth: 0.5  , 
        padding: 5 ,
        paddingBottom: 14 , 
        borderRadius: 10
    },iconWraper:{
        padding: 5 ,
        borderRadius: 10 ,
        margin: 2 ,
        borderWidth: 1 
    },taskIcon:{
        width: 45 ,
        height: 45 ,

    },iconOn:{
        backgroundColor: "#070000ff"
    },iconOff:{
        backgroundColor: "#ffffff91"
    },button:{
        paddingVertical: 5 , 
        paddingHorizontal: 15 , 
        borderRadius: 15 
    },cancelButton:{
        backgroundColor: "#a01414"
    },createButton:{
        backgroundColor: "#00ff15"
    },buttonText:{
        fontSize: 15 , 
        fontWeight: "900"
    },createText:{
        color: "#097c13ff"
    },cancelText:{
        color: "rgba(245, 224, 224, 1)"
    }
});