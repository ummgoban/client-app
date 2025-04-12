import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Message Handler:', remoteMessage);

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

  await notifee.displayNotification({
    title: remoteMessage.data?.title || '알림',
    body: remoteMessage.data?.body || '새로운 알림이 도착했습니다.',
    data: remoteMessage.data,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      sound: 'default',
      pressAction: {id: 'default'},
    },
    ios: {
      sound: 'default',
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
