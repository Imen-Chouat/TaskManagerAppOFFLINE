import React, { useState } from "react";
import { View , Modal , Text , TouchableOpacity , TextInput ,FlatList} from "react-native";
import { Image } from "expo-image";
import Icons from "../constants/Icons";
import CategorySelector from "./CategorySelector";
import databaseService from "../services/dataBaseService";
import DateTimePicker from "react-native-modal-datetime-picker"

export default function CreateTaskModal ({projectId,userId}) {
    const [title,setTitle] = useState(null);
    const [category,setCategory] = useState(null);
    const [time,setTime] = useState(new Date());
    const [date,setDate] = useState(new Date());
    const [state,setState] = useState(null);
    const [icon,setIcon] = useState(null);
    const [pickerTimeVisile,setTimeVisisble] = useState(false);
    const [pickerDateVisible,setDateVisible] = useState(true);

    const handleCreate = async () => {
        try {
            const created = await databaseService.createTask(userId,title,projectId,date.toISOString().split('T'),time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),state,category.id,icon);
        } catch (error) {
            console.error("Error creating a new task: ",Error);
        }
    }
    const requireImage = () => {
        try {
            if(icon){
                return require(Icons[icon]);
            }else{
                return require("../assets/icon/checklist.png");
            }
        } catch (error) {
            console.error("Error fetching the task icon path:",error);
        }
    }
    return(
        <Modal style={styles.container} >
            <View style={styles.modalBackgorund} > 
                <View style={styles.modalContent} >
                    <TextInput value={title} placeholder="Enter the task's title." onChangeText={(text)=>{setTitle(text.trim())}} style={styles.titleInput} />
                    <CategorySelector style={styles.categorySelector} onPress={(set)=>setCategory(set)} />
                    <FileList/>
                    <View>
                        <Image source={requireImage()}/>
                    </View>

                    <TouchableOpacity onPress={() => setTimeVisisble(true)} style={styles.timePicker} >
                        <Text style={styles.pickerTitle} >Time : </Text>
                        <Text style={styles.pickerInfo} >{time.toLocaleTimeString([],{hour: "2-digit" , minute: "2-digit"})}</Text>
                    </TouchableOpacity >
                    <DateTimePicker  isVisible={pickerTimeVisile} onCancel={()=>setTimeVisisble(false)} 
                    onConfirm={(pickedTime)=>setTime(pickedTime)} />
                    
                    <TouchableOpacity onPress={() => setDateVisible(true)} style={styles.datePicker} >
                        <Text style={styles.pickerTitle} >Date : </Text>
                        <Text style={styles.pickerInfo} >{date.toISOString().split('T')[0]}</Text>
                    </TouchableOpacity>
                    <DateTimePicker isVisible={pickerDateVisible} onCancel={() => setDateVisible(false)}
                    onConfirm={(pickedDate) => setDate(pickedDate)}    />


                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container:{
        
    },modalBackgorund:{

    },modalContent:{

    },titleInput:{

    },categorySelector:{

    },timePicker:{

    },datePicker:{

    },pickerTitle:{

    },pickerInfo
});