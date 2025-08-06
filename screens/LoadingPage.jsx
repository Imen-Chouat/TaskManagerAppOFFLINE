import React from "react";
import { View, Text ,StyleSheet} from "react-native";
import { Image } from "expo-image";

export default function LoadingPage () {
    
    return (
        <View style= {styles.container}>
            <Text style={styles.title} >Loading the page ...</Text>
            <Image 
            source={require("../assets/gif/launch.gif")}
            style={styles.gif}
            contentFit="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:" rgba(255, 255, 255, 1)",
        flex: 1 ,
        flexDirection:"column" ,
        alignItems:"center" ,
        paddingVertical: "15%"
    },title:{
        fontSize:26 ,
        fontWeight:"bold",
        marginTop: "25%",
        marginBottom: "2%"
    },gif:{
        width: 550 ,
        height: 450 ,
        resizeMode: "contain"
    }
});