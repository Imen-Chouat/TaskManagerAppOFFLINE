import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View , Alert, TouchableOpacity ,Text , Modal, FlatList, TextInput} from "react-native";
import { Image } from "expo-image";
import Icons from "../constants/Icons.jsx";
import * as SecureStore from "expo-secure-store";
import { format, addDays } from 'date-fns';
import AddProjectStyle from "../Styles/AddProjectStyle";
import databaseSevice from "../services/dataBaseService";
import LoadingPage from "./LoadingPage.jsx"
import CategorySelector from "../components/CategorySelector.jsx";
import DateTimePicker from "react-native-modal-datetime-picker";
import {isAfter,isBefore} from "date-fns";
export default function AddProjectPage(){
    const [project,setProject] = useState(null);
    const [user,setUser] = useState(null);
    const [title,setTitle] = useState("");
    const [startDate,setStart] = useState(new Date());
    const [endDate,setEnd] = useState();
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState();
    const [imageUrl,setUrl] = useState();
    const [categories,setCategories] = useState([]);
    const [loading,setLoding] = useState(true);
    const [modalVisibility,setVisibility] = useState(false);
    const [startVisible,setStartVisibility] = useState(false);
    const [endVisible,setEndVisibility] = useState(false);
    const navigator = useNavigation();
    const route = useRoute();
    const {type} = route.params || {};
    const maxlength = 255 ;
    const checkUpdate = ( ) => {
        let result = {title:null,description:null,start_date:null,end_date:null,category_id:null} ;
        if(project.title != title ) result.title = title ;
        if(project.description != description ) result.description = description ;
        if(project.start_date != startDate ) result.start_date = startDate.toISOString().split('T')[0] ;
        if(project.end_date != endDate) result.end_date = endDate.toISOString().split('T')[0];
        if(project.category.id != category.id) result.category_id = category.id ;
        if(project.title != title || project.descption != descption || project.start_date != startDate 
            || project.end_date != endDate || project.category.id != category.id) {
                return result ;
            }
        return null ;
    }
    const handleCreate = async () => {
        try {
            if(!title || !startDate || !endDate || !descption || !category ){
                let message = [] ;
                if(!title) message.push("Title");
                if(!startDate) message.push("Start Date");
                if(!endDate) message.push("End Date");
                if(!description) message.push("Description");
                if(!category) message.push("Category");
                Alert.alert("Error",`Please fill the project : ${message.join(" and ")} .`);
                return;
            }
            Alert.alert("Confirmation","Are you sure of the creation of this project ?",[
                {
                    text:"Cancel",
                    style:"cancel"
                },{
                    text:"Yes!" ,
                    onPress:async ()=>{
                        try {
                            const created = await databaseSevice.createProject(user.id,title,startDate.toISOString().split('T')[0],endDate.toISOString().split('T')[0],category.id,description,imageUrl) ;
                            if(!created){
                                Alert.alert("Error","Error creating the new project!");
                                return ;
                            }
                            Alert.alert("Success",`We successfully created a preject under the title ${title}`);
                            navigator.navigate("ProjectsPage");
                            return;
                        } catch (error) {
                            console.error("Error creating project:", error);
                        }
                    }
                }
            ])

        } catch (error) {
            console.error("Error handling the button click on Project creation page :",error);
        }
    }
    const handleUpdate = async () => {
        const newP = checkUpdate();
        if(!newP) {
            Alert.alert("No update!","Make sure you update one of the project information first.");
        }
        try {
            Alert.alert("Confiramation",`Are you sure you want to Update the project ${project.title} ?`,[
                {
                    text:"Cancel",
                    style:"cancel"
                },{
                    text:"Yes!",
                    onPress: async () => {
                        try {

                                const updated = await databaseSevice.updateProject(project.id,newP);
                                const fetched = await databaseSevice.getProjectByID(updated);
                                Alert.alert("Updated!",`We updated the project under the title ${fetched.title}`);
                                return;
                        } catch (error) {
                            console.error("Error creating project:", error);
                        }
                    }
                }
            ])
        } catch (error) {
            console.error("Error handling the button click on Project updating page :",error)
        }
    }
    const updateStart = (pickedDate) => {
        setStartVisibility(false);
        if(isBefore(pickedDate,endDate)) {
            setStart(pickedDate);
        }else{
            Alert.alert("Can't update start date",`Your chosed date { ${pickedDate.toISOString().split('T')[0]} } is After the project's end date { ${endDate.toISOString().split('T')[0]} } .`);
        }
    }
    const updateEnd = (pickedDate) => {
        setEndVisibility(false);
        if(isAfter(pickedDate,startDate)){
            setEnd(pickedDate);
        }else{
            Alert.alert("Can't update start date",`Your chosed date { ${pickedDate.toISOString().split('T')[0]} } is Before the project's start date { ${startDate.toISOString().split('T')[0]} } .`);
        }
    }
    const imageSource = () => {
        if(!imageUrl){
            setUrl("check-list");
            return require("../assets/icon/check-list.png");
        }else{
            return Icons[imageUrl];
        }
    }
    const handleIconSelect = (item) => {
        setUrl(item);
        setVisibility(false);
    }
    const fetchData = async () => {
        try {
            const userStored = await SecureStore.getItemAsync("user");
            const userParsed = JSON.parse(userStored);
            setUser(userParsed);
            const projectStored = await SecureStore.getItemAsync("project");
            const projectParsed = JSON.parse(projectStored);
            setProject(projectParsed);
            const categoriesStored = await SecureStore.getItemAsync("categories");
            const categoriesParsed = JSON.parse(categoriesStored);
            setCategories(categoriesParsed);
            const date = new Date();
            setStart(date);
            const tommorow = addDays(date,1);
            setEnd(tommorow);
            setTitle("");
            
            if(type == "create"){
                if(categoriesParsed.length > 0) setCategory(categoriesParsed[0]);
                setDescription("");
                setUrl(null);
            }else{
                setCategory(projectParsed.category);
                setUrl(projectParsed.image);
                setDescription(projectParsed.description);
                setTitle(projectParsed.title);
            }
        } catch (error) {
            console.error("Error fetching the data in creating /updationg project page",error)
        }finally {
            setLoding(false);
        }
    }
    useEffect(()=>{
        console.log(type);
        fetchData();
        console.log(project);
    },[]);

    return (
       ( loading ) ? (
        <LoadingPage/>
       ) : (
        <View style={styles.container}>
            <View style={styles.upperSide}>
                <TouchableOpacity onPress={()=>{navigator.goBack()}} style={styles.arrowLeftWrapper}>
                    <Image style={styles.arrowLeft} source={require("../assets/icon/emptyLeftArrow.png")} contentFit="contain"  />
                </TouchableOpacity>

                <Text style={styles.pageTitle} >Manage your Project</Text>
            </View>
            <CategorySelector categories={categories} category={category} onPress={(item) => {setCategory(item)}} 
                style={styles.iconSelector}/>
            <View>
                <Text style={styles.titleText} >Project Title</Text>
                <TextInput style={styles.titleInput} value={title} onChangeText={setTitle} />
            </View>

            <View style={{flexDirection:"row" , marginBottom: 10 ,  alignItems:"center"} } >
                <Text style={styles.informDate} >Start Date:</Text>
                <TouchableOpacity style={styles.datePress} onPress={()=>{ setStartVisibility(true); } }>
                    <Text style={styles.dateText}>{startDate.toISOString().split('T')[0]}</Text>
                </TouchableOpacity>
                <DateTimePicker
                isVisible={startVisible}
                
                onCancel={()=>{setStartVisibility(false)}}
                onConfirm={(pickedDate)=>{ updateStart(pickedDate); }}
                />
            </View>


            <View style={{flexDirection:"row", marginBottom: 3 , alignItems:"center" ,}} >
                <Text style={styles.informDate} >End Date:</Text>
                <TouchableOpacity style={styles.datePress} onPress={()=>{setEndVisibility(true);}}>
                    <Text style={styles.dateText}>{endDate.toISOString().split('T')[0]}</Text>
                </TouchableOpacity>
                <DateTimePicker
                isVisible={endVisible}
                onCancel={()=>{setEndVisibility(false)}}
                onConfirm={(pickedDate)=>{ updateEnd(pickedDate); }}
                />
            </View>
            <View style={{marginBottom: 10}} >
                <View style={{flexDirection:"row" , alignItems: "center" }} >
                    <Text style={styles.titleText} >Project Description</Text>
                    <Text style={styles.descriptionLength} >{description.length} /{maxlength}</Text>
                </View>
                <TextInput style={styles.description} placeholder="Enter your project description"
                value={description} onChangeText={setDescription} multiline maxLength={maxlength}/>
            </View>

            <View style={styles.imageBlock}>
                <Text style={styles.imageText} >Project Image (click to change )</Text>
                <TouchableOpacity 
                style={styles.imageContainer} onPress={()=>setVisibility(true)}>
                    <Image source={imageSource()} style={styles.projectImage} />
                </TouchableOpacity>
                <Modal 
                visible={modalVisibility}
                transparent={true}
                style={styles.modalStyle}
                animationType="slide"
                onRequestClose={()=>{setVisibility(false)}}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Select An image from this list !</Text>
                        <FlatList
                        data={Object.entries(Icons)}
                        keyExtractor={([key]) => key}
                        numColumns={4}
                        renderItem={({item})=> {
                            const [key,src] = item ;
                            return(
                            <TouchableOpacity style={styles.imageWraper} onPress={()=>{handleIconSelect(key)}}>
                                <Image source={src} style={styles.image} />
                            </TouchableOpacity>
                            );
                            
                        }}
                        />
                        <TouchableOpacity style={styles.closeModal} >
                            <Text style={styles.closeModalText} onPress={()=>setVisibility(false)} >Close</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
            <TouchableOpacity style={[styles.button]} onPress={async ()=>{
                if(type == "create"){
                    await handleCreate();
                }else{
                    await handleUpdate();
                }
            }}>
                <Text style={styles.buttonText}  >{type} the project</Text>
            </TouchableOpacity>

        </View> ) 
    );
}
const styles = AddProjectStyle;