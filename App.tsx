import React, {useEffect} from 'react';
import './gesture-handler';
import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import {setUpPushNotificationHandlers} from './src/utils/notification';
// const isDarkMode = useColorScheme() === 'dark';

function App(): React.JSX.Element {
  useEffect(() => {
    setUpPushNotificationHandlers();
    SplashScreen.hide();
  }, []);
  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  );
}

export default App;
