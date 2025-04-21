// src/context/NotificationProvider.tsx
import React, {
  createContext,
  useEffect,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';
import {Alert} from 'react-native';
import notifee, {
  EventType,
  Notification,
  AndroidImportance,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import notificationService from '@/utils/notification.service';
import {navigationRef} from './NavigationProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NotificationContextType = {
  goToNotificationSettings: () => void;
  requestPermissions: () => Promise<boolean>;
};

type NotificationPayload = {
  routeName: string;
  screen?: string;
  params?: string;
};

const NotificationContext = createContext<NotificationContextType>({
  goToNotificationSettings: () => {},
  requestPermissions: async () => false,
});

const NotificationProvider: React.FC<PropsWithChildren> = ({children}) => {
  const onPressedNotification = useCallback(
    async (notification: Notification) => {
      if (!notification?.data) {
        console.log('none data');
        return;
      }

      try {
        const payload = notification.data as NotificationPayload;
        if (payload.routeName && navigationRef.current?.isReady()) {
          const parsedParams = payload.params
            ? JSON.parse(payload.params)
            : undefined;
          navigationRef.current.navigate(payload.routeName, {
            screen: payload.screen,
            params: parsedParams,
          });
        }
      } catch (err) {
        console.log('Error in onPressedNotification:', err);
      }
    },
    [],
  );

  const displayNotification = useCallback(async (remoteMessage: any) => {
    try {
      const title =
        remoteMessage.data?.title ||
        remoteMessage.notification?.title ||
        '알림';
      const body =
        remoteMessage.data?.body ||
        remoteMessage.notification?.body ||
        '새로운 알림이 도착했습니다.';

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });

      await notifee.displayNotification({
        title,
        body,
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
    } catch (error) {
      console.log('displayNotification Error:', error);
    }
  }, []);

  const requestPermissions = useCallback(async () => {
    const alreadyGranted = await notificationService.isGranted();
    if (alreadyGranted) return true;

    const granted = await notificationService.upsertPermissions();
    return granted;
  }, []);

  const goToNotificationSettings = useCallback(() => {
    notificationService.goToNotificationSettings();
  }, []);

  // 푸시 권한 요청 + FCM 토큰 발급
  useEffect(() => {
    (async () => {
      const granted = await requestPermissions();
      console.log('푸시 권한 여부:', granted);

      if (granted) {
        const token = await notificationService.getToken();
        console.log('FCM_TOKEN:', token);
      } else {
        const isNotificationAlertShown = await AsyncStorage.getItem(
          'isNotificationAlertShown',
        );
        if (!isNotificationAlertShown) {
          Alert.alert(
            '알림 권한 거부됨',
            '알림을 받으려면 권한 설정이 필요합니다.',
          );
          await AsyncStorage.setItem('isNotificationAlertShown', 'true');
        }
      }
    })();
  }, [requestPermissions]);

  // Foreground 알림 수신 처리
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);
      await displayNotification(remoteMessage);
    });
    return unsubscribe;
  }, [displayNotification]);

  // Background 알림 터치 처리
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data) {
        onPressedNotification({data: remoteMessage.data} as Notification);
      }
    });
    return unsubscribe;
  }, [onPressedNotification]);

  // Quit 상태 알림 터치 처리
  useEffect(() => {
    (async () => {
      const initialMessage = await messaging().getInitialNotification();
      if (initialMessage?.data) {
        onPressedNotification({data: initialMessage.data} as Notification);
      }
    })();
  }, [onPressedNotification]);

  // Notifee 알림 클릭 처리 Foreground 상태
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
        onPressedNotification(detail.notification as Notification);
      }
    });
    return unsubscribe;
  }, [onPressedNotification]);

  // Notifee 알림 처리 Background 처리 등 필요할때
  useEffect(() => {
    const unsubscribe = notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log('Notifee onBackgroundEvent:', type, detail);
    });
    return unsubscribe;
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        goToNotificationSettings,
        requestPermissions,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;
