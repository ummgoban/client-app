import React, {useEffect} from 'react';
import './gesture-handler';
import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // TODO: 권한 요청 로직 호출
      } catch (error) {
        console.error('splash screen error:', error);
      } finally {
        SplashScreen.hide();
        console.log('splash screen hide');
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
