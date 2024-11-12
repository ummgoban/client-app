import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

//TODO: 권한 정보 저장 필요

// 포어그라운드에서 푸시 알림 처리 함수
export const handleForegroundMessage = () => {
  return messaging().onMessage(async remoteMessage => {
    Alert.alert('푸시 알림', JSON.stringify(remoteMessage));
  });
};

// 토큰 획득 및 권한 확인 함수
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // FCM 현재 권한 상태
    // 1 = 권한 승인, enabled
    // 2: Provisional authorization 승인
    // 3: 앱 클립용 알림 승인, 제한 시간 알림
    // 0 = 권한 거부
    // -1 = 권한 미요청
    console.log('Authorization status:', authStatus);
    // 기기 등록 토큰
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  } else {
    console.log('Notification permission denied');
  }
};

// 알림 권한 승인 함수(안드로이드)
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: '푸시 알림 허용',
        message: '앱에서 알림을 받기 위해 권한이 필요합니다.',
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

// 백그라운드에서 푸시 알림 처리 함수
export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('백그라운드 push', remoteMessage);
  });
};
