import React from "react";
import { StyleSheet , TouchableOpacity , Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function StartButton ({title , onPress}) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.title}> {title} </Text>
            <Icon name="arrow-right" size={21} color="#4285F4" style={styles.icon} />
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(252, 167, 88)' ,
        color: 'rgb(15, 33, 136)',
        paddingRight: 25 ,
        paddingLeft: 25 ,
        paddingTop: 5 ,
        paddingBottom: 5 ,
        borderRadius: 40,
        minWidth: '250' ,
        position: 'relative',
        minHeight: 40 ,
        justifyContent: 'center'
    },title:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },icon:{
        position:'absolute',
        right:'10%',
        top:'26%'
    }
});