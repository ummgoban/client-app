import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {PermissionsAndroid, Platform, Alert, Linking} from 'react-native';
import {registerFCMToken} from '@/apis/Fcm';

export const requestNotificationPermission = async (): Promise<boolean> => {
  const enabled = await isNotificationPermissionEnabled();
  if (enabled) {
    console.log('Notification permission granted');
    return true;
  }
  try {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('fcm 권한 허용', authStatus);
    } else {
      console.log('fcm 권한 거부됨');
      return false;
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const androidPermission = await requestAndroidPermission();
      if (!androidPermission) {
        console.log('Android POST_NOTIFICATIONS 권한 거부됨');
        return false;
      }
    }
    const token = await messaging().getToken();
    await registerFCMToken(token);
    setupPushNotificationHandlers();
    console.log('FCM Token:', token);
    console.log('Notification permission changed');
    return true;
  } catch (error) {
    console.error('Notification permission error:', error);
    return false;
  }
};

export const isNotificationPermissionEnabled = async (): Promise<boolean> => {
  const status = await messaging().hasPermission();
  const AndroidPermssionStatus: boolean =
    Platform.OS === 'android' && Platform.Version >= 33
      ? await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        )
      : true;
  return (
    AndroidPermssionStatus &&
    (status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL)
  );
};

const requestAndroidPermission = async (): Promise<boolean> => {
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
    return true;
  } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    console.log('Notification permission NEVER_ASK_AGAIN');
    Alert.alert(
      '알림 권한 필요',
      '앱 알림을 활성화하려면 설정에서 권한을 활성화해야 합니다.',
      [
        {
          text: '설정으로 이동',
          onPress: () => {
            Linking.openSettings();
          },
          style: 'default',
        },
        {text: '취소', style: 'cancel'},
      ],
    );
  } else {
    console.log('Notification permission denied');
  }

  return false;
};

export const changeNotificationPermission = async (currentStatus: boolean) => {
  if (currentStatus) {
    Alert.alert(
      '알림 권한 비활성화',
      '알림 권한을 비활성화하려면 설정에서 변경해야 합니다.',
      [
        {
          text: '설정으로 이동',
          onPress: () => {
            Linking.openSettings();
          },
          style: 'default',
        },
        {text: '취소', style: 'cancel'},
      ],
    );
  } else {
    await requestNotificationPermission();
  }
};

const setupPushNotificationHandlers = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground Message:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Message:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    console.log('Notifee Background Event:', type, detail);
  });
};

const displayNotification = async (remoteMessage: any) => {
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
const createAndroidChannel = async (): Promise<string> => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
  return channelId;
};
