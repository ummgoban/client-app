import React, {useEffect} from 'react';
import './gesture-handler';
import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import {setUpPushNotificationHandlers} from './src/utils/notification';
import {requestNotificationPermission} from './src/utils/notification';

// const isDarkMode = useColorScheme() === 'dark';

function App(): React.JSX.Element {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 푸시 알림 핸들러 설정
        await requestNotificationPermission();
        await setUpPushNotificationHandlers();

        // 알림 권한 요청 (필요 시)

        // 스플래시 화면 숨기기
        console.log('앱 초기화 완료');
      } catch (error) {
        console.error('앱 초기화 중 오류 발생:', error);
      }
    };

    initializeApp();
    SplashScreen.hide();
  }, []);

  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  );
}

export default App;
