import React , {useState ,useRef, useEffect} from "react";
import { Button, TextInput, View, Text , Image, Alert } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
import SignUpStyle  from "../Styles/SignUpStyle" ;
import { LinearGradient } from "expo-linear-gradient";
import SignButton from "../components/elements/SignButton";
import { useNavigation } from '@react-navigation/native';
import dataBaseService from "../services/dataBaseService";
import authService from "../services/authService";
import * as SecureStore from "expo-secure-store";

/*Creating a new account : sign Up */
export default function SignUp(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [confirmPassword,setConfirm] = useState(''); 
    const [consistentPass,setConsistency] = useState(false);
    const [isloading,setLoading] = useState(false);
    const navigator = useNavigation();
    const [showPass , setShowPass] = useState(false);
    const [showConfirm,setShowConfirm] = useState(false);
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const emailRef = useRef();
    const nameRef = useRef();
    const handleConfirm = ()=>{
        const pass = password.trim();
        const confirm = confirmPassword.trim();
        const compare = pass == confirm ;
        setConsistency(compare);
            
        return compare ;
    }
    useEffect(()=>{
        SecureStore.setItemAsync("token","null");
        SecureStore.setItemAsync("user","null");
    },[]);
    const handleSignUp = async () => {
        try {
        let message = "you need to enter : ";
        message += name ?"" : "your user name ";
        message += email ? "" : " email ";
        message += password ? "" :" password ";
        message += confirmPassword ?"" : " password confirmation ";
        message += ".";
        setLoading(true);
        if(!name || ! email || ! password || ! confirmPassword ){
            setLoading(false);
            Alert.alert('Error',message);
            return ;
        }
        let user = await dataBaseService.getUserByEmail(email);
        if(user){
            setLoading(false);
            Alert.alert('Error',"The email already exists , Sign in if you have an account !");
            return ;
        }
        
        if(!handleConfirm()){
            setLoading(false);
            Alert.alert('Error',"The password and its confirmation are not consistent , recheck them !");
            return ;
        }

        const hashedPass = await authService.hashPassword(password);
        const id = await dataBaseService.createUser(name,email,hashedPass);
        if(!id){
            setLoading(false);
            Alert.alert('Error',"Didn't insert the user !");
            return ;
        }
        user = await dataBaseService.getUserByEmail(email);
        console.log(user);
        const {token,refreshToken} = await authService.generateTokens(user.id,name,email);
        await authService.saveTokens(token,refreshToken);
        await SecureStore.setItemAsync("user",JSON.stringify(user));
        let get = await SecureStore.getItemAsync("user");
        console.log(get);
        setLoading(false);
        Alert.alert('Success',"The sign up was successfull !");
        navigator.navigate("Home");
        } catch (error) {
            console.error("Error signing Up",error);
        }
    }
    return(
        <LinearGradient colors={['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(34, 124, 228)']} 
         style={{ flex: 1 }}>
        <View style={styles.gradient}>
            <View style={styles.containerA}>
                <Image source={require('../assets/images/SignUpbg.png')} style={styles.image}/>
                <Icon name="arrow-left" size={30} color={'rgb(39, 36, 36)'} style={styles.icon} onPress={()=>{
                    navigator.navigate('WelcomePage');
                }}/>
                <Text style={styles.welcomeText}>Create Your Own Account !</Text>
            </View>
            <LinearGradient colors={['rgb(172, 249, 255)', 'rgb(94, 97, 255)','rgb(14, 132, 201)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.containerB} >
            
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} autoCapitalize="none" maxLength={20} placeholder="Enter your UserName" value={name} onChangeText={setName} ref={nameRef} onSubmitEditing={()=>emailRef.current.focus() } />    
                </View>

                <View style={styles.inputContainer}>

                    <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} ref={emailRef} onSubmitEditing={()=>passwordRef.current.focus()} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter your password here." value={password} onChangeText={setPassword} secureTextEntry={!showPass} ref={passwordRef}
                    returnKeyType="next"onSubmitEditing={() => confirmPasswordRef.current.focus()} />
                    <Icon name={showPass ? "eye" : "eye-slash"} size={23} style={styles.showIcon} onPress={()=>{setShowPass(!showPass)}} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Confirm your password" value={confirmPassword} onChangeText={setConfirm} secureTextEntry={!showConfirm} ref={confirmPasswordRef} />
                    <Icon name={showConfirm ? "eye" : "eye-slash"} size={23} style={styles.showIcon} onPress={()=>{setShowConfirm(!showConfirm)}} />
                </View>
                <SignButton title={isloading ? 'Signing Up ..' : 'Sign Up'} onPress={handleSignUp} style={styles.signButton}/>

                <Text style={styles.dont}>Already have an account ? <Text style={styles.signIn} onPress={()=>{navigator.navigate('SignIn')}}>Sign In</Text></Text>
            
            </LinearGradient>
        </View>
        </LinearGradient>
    );
};
const styles = SignUpStyle ;