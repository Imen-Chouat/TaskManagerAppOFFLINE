import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        padding:10 ,
        paddingTop: 25 ,
        backgroundColor:"rgba(255, 255, 255, 1)" 
    },scrollContent:{
        paddingBottom:84
    },upperSide:{
        flexDirection:"row" ,
        alignItems:"center",
        paddingHorizontal: 10 ,
        justifyContent: "center" ,
        marginBottom: 10
    },goBack:{
        height:45 ,
        alignContent:"center",
        justifyContent:"center", 
        position:"absolute" ,
        left: 10
    },leftArrow:{
        flex:1 ,
        width:35 ,
    },WelcomeTitle:{
        fontWeight: "bold" ,
        fontSize: 18
    },profileContainer:{
        borderWidth: 2 ,
        padding: 8 ,
        borderRadius: 15 ,
        width: "80%" ,
        alignSelf:"center" ,
        borderColor: "rgba(74, 115, 250, 0.1)" ,
        marginBottom: 12
    },profileImage:{
        height:115 ,
        width:115 ,
        alignSelf:"center",
        backgroundColor:"rgba(0, 0, 0, 1)" ,
        borderRadius: 100 ,
    },userName:{
        alignSelf: "center" ,
        fontSize: 20 ,
        fontWeight: "400" ,
        color: "rgba(0, 0, 0, 0.66)" ,
        marginTop: 5 ,
    },level:{
        alignSelf:"center" ,
        color: "rgba(255, 166, 0, 1)" ,
        fontWeight: "bold" ,
        marginTop: -3
    },informationBlock:{
        flexDirection:"row" ,
        padding:10 ,
        borderColor: "rgba(129, 196, 250, 0.44)" ,
        borderWidth: 1 ,
        borderRadius: 5 ,
        margin : 4 ,
        backgroundColor: "rgba(184, 223, 255, 0.28)"
    },informationTitle:{
        color : "rgba(3, 80, 180, 1)" ,
        fontWeight: "900" ,
        marginRight: 6
    },information:{
        fontWeight: "700"
    },sideTitle:{
        marginLeft: 45 ,
        fontWeight: "bold" ,
        fontSize: 19 ,
        marginBottom: 8 ,
        color: "rgba(58, 36, 184, 1)"
    },utilitiesSide:{
        marginBottom: 10
    },utility:{
        borderWidth: 1 ,
        borderColor: "rgb(100,100,100)" ,
        padding : 10 ,
        width : "100%" ,
        backgroundColor: "rgba(146, 66, 221, 1)" , 
        margin : 5 ,
        alignSelf: "center" ,
        fontSize: 13 ,
        borderRadius: 8
    },buttonText:{
        alignSelf:"center" ,
        fontSize:15 ,
        fontWeight: "bold" ,
        color: "rgba(255, 255, 255, 1)" 
    }
});