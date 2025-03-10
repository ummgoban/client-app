import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {PermissionsAndroid, Platform, Alert, Linking} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    console.log(authStatus);
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('fcm 권한 허용', authStatus);
    } else {
      console.log('fcm 권한 거부됨', authStatus);
      return;
    }
  } else if (Platform.OS === 'android') {
    const androidPermission = await requestAndroidPermission();
    if (!androidPermission) {
      console.log('Android POST_NOTIFICATIONS 권한 거부됨');
      return;
    }
  }
};

const isIOSNotificationPermissionEnabled = async (): Promise<boolean> => {
  const status = await messaging().hasPermission();
  return (
    status === messaging.AuthorizationStatus.AUTHORIZED ||
    status === messaging.AuthorizationStatus.PROVISIONAL
  );
};

const isAndroidNotificationPermissionEnabled = async (): Promise<boolean> => {
  const androidPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  return androidPermission;
};

export const isNotificationPermissionEnabled = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return await isIOSNotificationPermissionEnabled();
  } else if (Platform.OS === 'android') {
    return await isAndroidNotificationPermissionEnabled();
  }
  return false;
};

const requestAndroidPermission = async (): Promise<boolean> => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const changeNotificationPermission = async () => {
  Alert.alert(
    '알림 권한 활성화',
    '알림 권한을 변경하려면 설정에서 변경해야 합니다.',
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
};

/** TODO: Background Message Handler, On Notification Opened App, On Background Event 설정 */
export const setUpPushNotificationHandlers = async () => {
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground Messaddge:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Message:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('On Notification Opened App:', remoteMessage);
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    console.log('onBackgroundEvent');
    console.log('Notifee Background Event:', type, detail);
  });

  notifee.onForegroundEvent(async ({type, detail}) => {
    console.log('onForegroundEvent');
    console.log('Notifee Foreground Event:', type, detail);
  });
};

export const displayNotification = async (remoteMessage: any) => {
  let title = remoteMessage.notification?.title;
  let body = remoteMessage.notification?.body;

  if (!title && !body) {
    title = remoteMessage.data?.title || '맘찬픽';
    body = remoteMessage.data?.body || '새로운 알림이 있습니다.';
  }

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

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log('Android 권한 요청 결과:', granted);
    switch (granted) {
      case PermissionsAndroid.RESULTS.GRANTED:
        return 'granted';
      case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
        return 'never_ask_again';
      default:
        return 'denied';
    }
  } else {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('iOS 권한 요청 결과:', result);
    if (result === RESULTS.GRANTED) {
      return 'granted';
    } else {
      console.log('IOS 위치 허용 꺼짐');
      return 'never_ask_again';
    }
  }
};

export const changeLocationPermission = async () => {
  Alert.alert(
    '위치 권한 변경',
    '위치 권한을 변경하려면 설정에서 변경해야 합니다.',
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
};
