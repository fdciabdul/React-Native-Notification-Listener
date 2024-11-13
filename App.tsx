import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, AppState, Alert } from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import { styles } from './src/assets/style';
import MintaPermission from './src/components/requestPermission';
import MainScreen from './src/MainScreen';

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkPermission = async () => {
    setIsLoading(true);
    const permission = await RNAndroidNotificationListener.getPermissionStatus();
    setHasPermission(permission !== 'denied');
    Alert.alert('Permission Status', `Has Permission: ${permission !== 'denied'}`);
    setIsLoading(false);
  };

  useEffect(() => {
    // Check permission on initial load
    checkPermission();

    // Set up AppState listener
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkPermission(); // Check permission only when the app comes to the foreground
      }
    });

    // Clean up AppState listener on component unmount
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : hasPermission ? (
        <MainScreen />
      ) : (
        <MintaPermission />
      )}
    </SafeAreaView>
  );
};

export default App;
