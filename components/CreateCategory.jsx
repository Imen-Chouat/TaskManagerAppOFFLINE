import React, { useState } from "react";
import { View , StyleSheet , TouchableOpacity , Modal, TextInput, Alert, FlatList , Text } from "react-native";
import { Image } from "expo-image";
import Icons from "../constants/Icons";
import dataBaseService from "../services/dataBaseService";

export default function CreateCategory({style,user,visible,onClose}) {
    const [name,setName] =useState("");
    const [imageUrl,setUrl] = useState(null);
    const [selected,setSelected] = useState(null);
    const handleCreate = async () => {
        try {
            if(!name || ! imageUrl){
                let message = [];
                if(!name) message.push("enter the category Name");
                if(!imageUrl) message.push("choose the Icon for this category ");
                Alert.alert("Notification",`Please ${message.join(" And ")} .`);
                return;
            }
            console.log(user.id," ",name," ",imageUrl);
            const created = await dataBaseService.createCategory(user.id,name,imageUrl);
            Alert.alert("Created!",`Created the new Category ${name}`);
            resetForm();
        } catch (error) {
            console.error("Error creating a new category : ",error);
        }
    }
    const resetForm = () => {
        setName("");
        setUrl(null);
        setSelected(null);
        onClose();
    } 
    const handleSelect = (key) => {
        setUrl(key);
        setSelected(key);
    }
    return(
        <View style={style}>
            <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            >
                <View style={styles.modalBackground} >
                    <View style={styles.modalContent} >
                        <Text style={styles.modalTitle}>Create a new Category !</Text>
                        <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter the category name" value={name} onChangeText={(text) => {setName(text)}}/>
                        <Text style={styles.iconTitle} >Chose the category icon :</Text>
                        <FlatList
                        data={Object.entries(Icons)}
                        keyExtractor={([key]) => key}
                        numColumns={4}
                        renderItem={({item})=>{
                            const [key,src] = item ;
                            return(
                            <TouchableOpacity style={ key == selected ? [styles.iconSelected,styles.iconWraper] : styles.iconWraper }
                             onPress={() => { handleSelect(key) } }  >
                                <Image source={src} style={styles.icon} />
                            </TouchableOpacity>
                            );
                        }}
                        />
                        <View style={styles.buttonBlock}>
                            <TouchableOpacity style={[styles.createButton,styles.button]} 
                            onPress={()=>{handleCreate()}}>
                                <Text style={styles.buttonText} >Create</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cancelButton,styles.button]} onPress={()=>{ resetForm()}}>
                                <Text style={styles.buttonText} >Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{

    },modalBackground:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },modalContent:{
        backgroundColor: "#fff",
        padding: 20,
        paddingTop:34,
        borderRadius: 10,
        width: "90%",
        maxHeight: "80%",
        justifyContent:"center" ,
        alignItems:"center" ,
    },modalTitle:{
        fontSize: 17 ,
        fontWeight: "bold" ,
        color: "#ff1495ff",
        marginBottom: 20
    },input:{
        borderRadius: 40 ,
        margin: 10 ,
        padding: 8 ,
        fontSize: 18 , 
        borderWidth: 0.5 ,
        paddingHorizontal: 15 ,
        borderColor: "#6d0264ff" ,
        width:"100%" ,
    },iconTitle:{
        alignSelf:"" ,
        marginBottom: 15 ,
        fontSize: 17 ,
        fontWeight: "bold"

    },iconSelected:{
        backgroundColor:"#54db6675"
    },iconWraper:{
        justifyContent: "center" ,
        alignItems: "center" ,
        borderRadius: 4 ,
        borderWidth: 0.5 ,
        borderColor: "#000000" ,
        padding: 5 ,
        marginRight:5 ,
        marginBottom: 5
    },icon:{
        width: 50 ,
        height: 50 , 
    },buttonBlock:{
        width: "100%" ,
        flexDirection: "row" ,
        justifyContent: "space-around" ,
        marginTop: 10
    },cancelButton:{
        backgroundColor: "#ca1010ff" ,
        color: "#fff" ,
        borderRadius: 45
    },button:{
        padding: 8 ,
        paddingHorizontal: 28  ,
        
    },createButton:{
        backgroundColor: "#2cdd44ff" ,
        color: "#fff" ,
        borderRadius: 45  ,

    },buttonText:{
        fontSize: 17 ,
        fontWeight: "bold" ,
        color: "#fff"
    }
});