import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MainScreen, RegistrationScreen, UpdateProfileScreen, LoadingScreen } from './src/screens'
import auth from '@react-native-firebase/auth';
import { PERMISSIONS, checkMultiple , request, RESULTS } from 'react-native-permissions'

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [cameraGranted, setCameraGranted] = useState(false);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
     console.log(auth().currentUser);
    if (initializing) setInitializing(false);
  }

  const handleCameraPermission = async () => {
      console.log('handleCameraPermission');
    const res = await checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
    
    if (res === RESULTS.GRANTED) {
      setCameraGranted(true);
    } else if (res === RESULTS.DENIED) {
      await requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then((result) => {
        console.log('result', result);
        //result === RESULTS.GRANTED ? setCameraGranted(true); : setCameraGranted(false);
      });
      
    }
  };
  
  useEffect(() => {
    handleCameraPermission(); 
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) 
  return (
     <LoadingScreen />
  );

  if (!user) {
    return (
       <MainScreen />
    );
  }
  if (!user.displayName()) {
    return (
       <UpdateProfileScreen />
    );
  }
  return (
     <MainScreen />
  );
}