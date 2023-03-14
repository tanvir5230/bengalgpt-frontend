import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import {userContext} from '../../App';
import Logo from '../components/Logo';
import TypingAnimation from '../components/TypingAnimation';
import LogoNoWifi from '../components/LogoNoWifi';
import MenuDrawer from '../components/MenuDrawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faClose} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage() {
  const navigation = useNavigation();
  const {user, setUser} = useContext(userContext);
  const {isConnected} = useNetInfo();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasInternetConnection, setInternetConnetion] = useState(isConnected);
  const animationForCircles = useRef(new Animated.Value(0)).current;

  const secondCircleScale = animationForCircles.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = () => {
    navigation.navigate('ChatPage');
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Confirm', 'Do you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'Cancel',
        },
        {
          text: 'Exit',
          onPress: () => {
            try {
              AsyncStorage.setItem('user', JSON.stringify(user)).then(() =>
                console.log('Data saved during exit.'),
              );
            } catch (error) {
              console.error(
                'Error updating user object in asyncStorage:',
                error,
              );
            }
            // Exit the app
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setInternetConnetion(isConnected);
  }, [isConnected]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationForCircles, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animationForCircles, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [animationForCircles]);

  return (
    <>
      <StatusBar backgroundColor={isMenuOpen ? '#131313' : '#622ad6'} />
      <LinearGradient colors={['#622ad6', '#622afd', '#622ad6']}>
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenu}>
            {!isMenuOpen && (
              <FontAwesomeIcon icon={faBars} size={30} color={'white'} />
            )}
            {isMenuOpen && (
              <FontAwesomeIcon icon={faClose} size={40} color={'white'} />
            )}
          </TouchableOpacity>
          <View style={styles.header}>
            {hasInternetConnection && (
              <Text style={styles.welcomeText}>স্বাগতম বস</Text>
            )}
            {!hasInternetConnection && (
              <Text style={styles.welcomeText}>
                বস, {'\n'}ইন্টারনেট কানেকশন চালু করেন।
              </Text>
            )}
            <View style={styles.logoContainer}>
              <Animated.View
                style={[
                  styles.secondLayerCircle,
                  {transform: [{scale: secondCircleScale}]},
                ]}>
                {hasInternetConnection && <Logo />}
                {!hasInternetConnection && <LogoNoWifi />}
              </Animated.View>
            </View>
            {hasInternetConnection && (
              <Text style={styles.welcomeText}>
                আপনি যা জানতে চান,{'\n'}জানাতে প্রস্তুত আছি।
              </Text>
            )}

            {!hasInternetConnection && (
              <Text style={styles.welcomeText}>
                ইন্টারনেটে সংযুক্ত না হলে,{'\n'}সাহায্য করতে পারব না।
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signInButton}
              disabled={!hasInternetConnection}
              onPress={handleSubmit}>
              {!hasInternetConnection && (
                <Text style={styles.buttonText}>আলাপ শুরু করা যাবে না</Text>
              )}
              {hasInternetConnection && (
                <TypingAnimation
                  stylingObj={styles.buttonText}
                  delay={100}
                  text={'আলাপ শুরু করা যাক'}
                />
              )}
            </TouchableOpacity>
          </View>
          <MenuDrawer
            isOpen={isMenuOpen}
            onClose={handleMenu}
            user={user}
            setUser={setUser}
          />
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    minHeight: '100%',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
    paddingVertical: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    zIndex: 10,
  },
  logoContainer: {
    backgroundColor: '#743CFF',
    width: 150,
    height: 150,
    borderRadius: 240,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },
  secondLayerCircle: {
    backgroundColor: '#785EFF',
    width: 135,
    height: 135,
    borderRadius: 240,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  welcomeText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontFamily: 'sans-serif-thin',
    letterSpacing: 0.7,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  signInButton: {
    borderWidth: 3,
    borderColor: '#e9967a',
    backgroundColor: '#EFC050',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
