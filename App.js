// src/App.js
import React , {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';
import dataBaseService from './services/dataBaseService';
import * as SecureStore from 'expo-secure-store'

//Screens 
import CalenderPage from './screens/CalenderPage';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import WelcomePage from './screens/WelcomePage'
import TestScreen from './screens/TestScreen';
import TasksPage from './screens/TasksPage'
import ProjectsPage from './screens/ProjectsPage';
import LoadingPage from './screens/LoadingPage';
import ProfilePage from './screens/ProfilePage';

const Stack = createNativeStackNavigator();
export default function App() {
  const [token,setToken] = useState(null);
  const [refrechToken,setRefreshToken] = useState();
  const [appReady,setAppReady] = useState(false);
  useEffect(() => {

    const initializeApp = async () => {
      try {
        // UI setup
        NavigationBar.setVisibilityAsync("hidden");
        NavigationBar.setBehaviorAsync("inset-swipe");

        // Initialize database
        await dataBaseService.initDB();

        // Check for existing token
        const storedToken = await SecureStore.getItemAsync("token");
        console.log("Stored Token :",storedToken);
        setToken(storedToken);

        console.log("Initialization success:",token ? true : false);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setAppReady(true);
      }
    };

    initializeApp();
  }, []);
  if(!appReady){
    return (
    <LoadingPage/>
    );
  }
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={token ? "Home" : "WelcomePage"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="CalenderPage" component={CalenderPage} />
        <Stack.Screen name="TasksPage" component={TasksPage} />
        <Stack.Screen name="ProjectsPage" component={ProjectsPage} />
        <Stack.Screen name="LoadingPage" component={LoadingPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}