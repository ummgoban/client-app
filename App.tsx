import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import './gesture-handler'; // react-native-gesture-handler 필수

import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import {setUpPushNotificationHandlers} from './src/utils/notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// const isDarkMode = useColorScheme() === 'dark';

function App(): React.JSX.Element {
  useEffect(() => {
    setUpPushNotificationHandlers();
    SplashScreen.hide();
  }, []);

  return (
    <RootProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </RootProvider>
  );
}

export default App;
