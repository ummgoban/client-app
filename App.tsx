import React, {useEffect} from 'react';
import './gesture-handler';
import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import {setUpPushNotificationHandlers} from './src/utils/notification';
import useProfile from '@/hooks/useProfile';
// const isDarkMode = useColorScheme() === 'dark';

function App(): React.JSX.Element {
  const {refresh} = useProfile();

  useEffect(() => {
    setUpPushNotificationHandlers();
    SplashScreen.hide();
  }, []);

  // TODO: App 초기 실행 시 호출할 함수들 관리
  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  );
}

export default App;
