import React, {useEffect} from 'react';
import './gesture-handler';
import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import {requestNotificationPermission} from './src/utils/notification';
import messaging from '@react-native-firebase/messaging';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    const initializeApp = async () => {
      try {
        //TODO: fcm 토큰 등록 위치 논의 후 따로 분리 예정
        await requestNotificationPermission();
        setupForegroundMessageHandler();
      } catch (error) {
        console.error('splash screen error:', error);
      } finally {
        SplashScreen.hide();
      }
    };
    const setupForegroundMessageHandler = () => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('[+] Foreground Message:', JSON.stringify(remoteMessage));
      });

      return unsubscribe;
    };
    initializeApp();
    return () => {
      const unsubscribe = setupForegroundMessageHandler();
      unsubscribe();
    };
  }, []);

  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  );
}

export default App;
