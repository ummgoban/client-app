import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {registerFCMToken} from '@/apis/Fcm';

// 포어그라운드에서 푸시 알림 처리 함수
export const onForegroundMessageHandler = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground Message:', remoteMessage);
    await displayNotification(remoteMessage);
  });
};

// 백그라운드에서 푸시 알림 처리 함수
export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Message:', remoteMessage);
    await displayNotification(remoteMessage);
  });
  notifee.onBackgroundEvent(async ({type, detail}) => {
    console.log('Notifee Background Event:', type, detail);
  });
};

// 알림 표시 함수
export const displayNotification = async (remoteMessage: any) => {
  const {title, body} = remoteMessage.notification ?? {};
  console.log('notification body:', title, body);

  if (Platform.OS === 'android') {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: await createAndroidChannel(),
        importance: AndroidImportance.HIGH,
        sound: 'default',
        pressAction: {
          id: 'default',
        },
      },
    });
  } else {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus) {
      console.log('iOS firebase notification permission');
    }
    await notifee.displayNotification({
      title,
      body,
      ios: {
        sound: 'default',
      },
    });
  }
};

// Android 채널 생성 함수
export const createAndroidChannel = async (): Promise<string> => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default', // 채널 기본 사운드 추가
  });
  return channelId;
};

// 알림 권한 요청 함수
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

// 알림 권한 요청 함수 (안드로이드)
export const requestNotificationPermission = async () => {
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

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  }
};
