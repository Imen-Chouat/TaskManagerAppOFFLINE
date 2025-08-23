// src/screens/Login.js
import React , { useState , useRef} from 'react';
import { View, Text , Image , TextInput, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignInStyle from '../Styles/SignInStyle';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignButton from '../components/elements/SignButton';
import dataBaseService from '../services/dataBaseService';
import authService from '../services/authService';
import * as SecureStore from 'expo-secure-store'

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading ,setLoading ] = useState(false);
  const [token,setToken] = useState();
  const [refreshToken,setRefreshToken] = useState();
  const [showPass , setShowPass] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigator = useNavigation();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        let message = [];
        if (!email) message.push("your email");
        if (!password) message.push("your password");
        Alert.alert("Error", `Please enter ${message.join(" and ")}.`);
        setLoading(false);
        return;
      }

      let user  = await dataBaseService.getUserByEmail(email);
      if(!user){
        setLoading(false);
        Alert.alert('Error',"the account doesn't exist , please sign up !")
        return ;
      }
      let correctPass = await authService.checkPassword(password,user.id);
      if(!correctPass){
        setLoading(false);
        Alert.alert('Error',"Password incorrect !");
        return ;
      }
      let tokens = await authService.generateTokens(user.id,user.user_name,user.email);
      setToken(tokens.token);
      setRefreshToken(tokens.refreshToken);
      await authService.saveTokens(tokens.token,tokens.refreshToken);
      console.log(user);
      await SecureStore.setItemAsync("user",JSON.stringify(user));
      Alert.alert('success',"Sign In successfully ");
      navigator.navigate("Home");
    } catch (error) {
      console.error(`Error Sign in the email ${email} : `,error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.gradient}>
      <View style={styles.containerA}>
        <Image source={require('../assets/images/SignIn.png')} style={styles.image} />
        <Icon name="arrow-left" size={30} color={'rgb(39, 36, 36)'} style={styles.icon} onPress={()=>{
            navigator.goBack();
        }}/>
        <Text style={styles.welcomeText} >Welcome back home !</Text>
      </View>
      <LinearGradient colors={['rgb(172, 249, 255)', 'rgb(94, 97, 255)','rgb(14, 132, 201)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.containerB} >
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter your Email" value={email} onChangeText={text => setEmail(text.trim())} ref={emailRef} onSubmitEditing={()=> passwordRef.current.focus() } keyboardType='email-address' />    
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter your Password" value={password} onChangeText={text => setPassword(text.trim())} secureTextEntry={!showPass} ref={passwordRef} />
          <Icon name ={ showPass ? "eye" : "eye-slash"} size={23} style={styles.showIcon} onPress={()=>setShowPass(!showPass)}/>
        </View>
        <SignButton title={ isLoading ?'Signing in ...' : 'Sign In'} style={styles.signButton} onPress={handleSignIn} />
        <Text style={styles.dont}>Don't have an account ? <Text style={styles.signIn} onPress={()=>{navigator.navigate('SignUp')}}>Sign Up</Text></Text>
      </LinearGradient>
    </View>
  );
}

const styles = SignInStyle ;