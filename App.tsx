import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import './gesture-handler';

import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import {setUpPushNotificationHandlers} from './src/utils/notification';

// const isDarkMode = useColorScheme() === 'dark';

function App(): React.JSX.Element {
  useEffect(() => {
    setUpPushNotificationHandlers();
    SplashScreen.hide();
  }, []);

  // TODO: App 초기 실행 시 호출할 함수들 관리
  useEffect(() => {}, []);

  return (
    <RootProvider>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </RootProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
