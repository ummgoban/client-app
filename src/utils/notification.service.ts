// src/utils/notification.service.ts
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export class NotificationsService {
  // iOS/Android 푸시 권한이 이미 허용되었는지 확인
  async isGranted(): Promise<boolean> {
    const status = await messaging().hasPermission();
    console.log('@@ [isGranted] hasPermission status:', status);
    return (
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL
    );
  }

  async getToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      console.log('FCM_TOKEN =', token);
      return token;
    } catch (err) {
      console.log('FCM getToken error:', err);
      return null;
    }
  }

  // 권한 요청
  async upsertPermissions(): Promise<boolean> {
    // iOS
    const status = await messaging().requestPermission();
    console.log('@@ [upsertPermissions] requestPermission status:', status);
    // Android
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    return await this.isGranted();
  }

  goToNotificationSettings() {
    Alert.alert(
      '알림 권한 활성화',
      '알림 권한을 사용하려면 기기 설정에서 변경이 필요합니다.',
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
  }
}

const notificationService = new NotificationsService();
export default notificationService;
