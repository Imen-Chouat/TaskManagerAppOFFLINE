// src/screens/Home.js
import { View, Text, StyleSheet, Button ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import StartButton from '../components/elements/StartButton.jsx';




export default function WelcomePage() {
  const navigation = useNavigation();

  return (
        <LinearGradient colors={
          ['rgb(172, 249, 255)', 'rgb(94, 97, 255)','rgb(14, 132, 201)']} // Adjust colors to your preference
      style={{ flex: 1 }}
    >
      <View style={styles.container}> 
          <Text style={styles.title}>Welcome to Task Manager </Text>
          <View style={styles.imageContainer}>
              <Image source={require('../assets/images/welcome1.png')} style={{width: '100%',resizeMode: 'contain' }}/>
          </View>
          <View style={styles.buttonContainer}>
          
          <StartButton
          title="Let's Start "
          onPress={() => navigation.navigate('SignUp')} />
          </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'absolute' ,
    top: '16%',
    textAlign: 'center',
    color: 'rgb(255, 245, 230)'
  },
  imageContainer: {
        margin: 20 ,
        position: 'absolute' ,
        top: '18%' ,
        width: '105%' ,
        resizeMode: 'contain' ,
        height: undefined
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '14%' ,
  }, button: {
    color: 'rgba(123, 231, 120, 0.1)' ,
    backgroundColor: 'rgba(52, 165, 48, 0.1)'
  },buttonTitle: {
    color: 'rgb(71, 41, 41)'
  }
});