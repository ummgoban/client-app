import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {PermissionsAndroid, Platform, Alert, Linking} from 'react-native';
import {registerFCMToken} from '@/apis/Fcm';

// 알림 권한 요청 함수
export const requestNotificationAndPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: '푸시 알림 권한 요청',
        message: '알림을 활성화하려면 권한이 필요합니다.',
        buttonNeutral: '나중에',
        buttonNegative: '취소',
        buttonPositive: '확인',
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission denied');
      return false;
    }
  }
  await requestUserPermission();
  setupPushNotificationHandlers();
  return true;
};

export const handleNotificationPermission = async (currentStatus: boolean) => {
  if (currentStatus) {
    Alert.alert(
      '알림 비활성화',
      '알림 권한을 비활성화하려면 설정에서 변경해야 합니다.',
      [
        {
          text: '설정으로 이동',
          onPress: () => {
            // iOS와 Android 설정 화면으로 이동
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
              Linking.openSettings();
            }
          },
          style: 'default',
        },
        {text: '취소', style: 'cancel'},
      ],
    );
  } else {
    await requestNotificationAndPermission();
  }
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted');
    const token = await messaging().getToken();
    await registerFCMToken(token);
    console.log('FCM Token:', token);
  } else {
    console.log('Notification permission denied');
  }
};

export const setupPushNotificationHandlers = () => {
  // 포어그라운드에서 푸시 알림 처리 함수
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground Message:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  // 백그라운드에서 푸시 알림 처리 함수
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Message:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    console.log('Notifee Background Event:', type, detail);
  });
};

export const displayNotification = async (remoteMessage: any) => {
  const {title, body} = remoteMessage.notification ?? {};

  const notificationOptions = {
    title,
    body,
    android:
      Platform.OS === 'android'
        ? {
            channelId: await createAndroidChannel(),
            importance: AndroidImportance.HIGH,
            sound: 'default',
            pressAction: {id: 'default'},
          }
        : undefined,
    ios: Platform.OS === 'ios' ? {sound: 'default'} : undefined,
  };

  await notifee.displayNotification(notificationOptions);
};

// Android 채널 생성 함수
export const createAndroidChannel = async (): Promise<string> => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
  return channelId;
};
