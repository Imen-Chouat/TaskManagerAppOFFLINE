import React, { useEffect, useState } from "react";
import { View ,Text} from "react-native";
import { Image } from "expo-image";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStorage from 'expo-secure-store';
import ProfilePageStyle from "../Styles.js/ProfilePageStyle";
import LoadingPage from "./LoadingPage";
export default function ProfilePage (){
    const [user,setUser] = useState(null);
    const [Loading,setLoading] = useState(false);
    const fetchUser = async () => {
        const userStored = await SecureStorage.getItemAsync("user");
        setUser(JSON.parse(userStored));
    }
    const fetchData = async () => {
        setLoading(true);
        try {
            await fetchUser();
        } catch (error) {
            
        }finally{
            setLoading(false);
        }
        
    };
    useEffect(()=>{
        fetchData();
    },[]);
    return (
        (Loading) ? (
            <LoadingPage/>
        ) : (
            <View style={styles.container}>
                <View style={styles.upperSide} >
                    <View style={styles.goBack} >
                        <Icon name={"home"} />
                    </View>
                    

                </View>
                <Text>Hello user</Text>
            </View>
        )
    );
};

const styles = ProfilePageStyle ;