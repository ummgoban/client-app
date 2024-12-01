import React, {useEffect} from 'react';
import './gesture-handler';
import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import {requestNotificationPermission} from './src/utils/notification';
import {checkFirstLaunch} from '@/utils/storage';
function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    const initializeApp = async () => {
      try {
        //TODO: fcm 토큰 등록 위치 논의 후 따로 분리 예정
        const isFirstLaunch = await checkFirstLaunch();
        if (isFirstLaunch) {
          await requestNotificationPermission();
        }
      } catch (error) {
        console.error('splash screen error:', error);
      } finally {
        SplashScreen.hide();
      }
    };
    initializeApp();
  }, []);
  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  );
}

export default App;
