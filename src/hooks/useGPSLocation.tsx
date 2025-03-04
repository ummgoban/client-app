import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {
  requestLocationPermission,
  requestNotificationPermission,
} from '@/utils/notification';

const useGPSLocation = () => {
  const [location, setLocation] = useState<{
    userLatitude: number;
    userLongitude: number;
  } | null>(null);

  const getCurrentLocation = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission !== 'granted') {
      Alert.alert('위치 권한이 허용되지 않아 기본 가게들을 조회합니다');
      return false;
    }

    return new Promise<boolean>(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          if (
            location?.userLatitude === latitude &&
            location?.userLongitude === longitude
          ) {
            resolve(true);
            return;
          }
          setLocation({userLatitude: latitude, userLongitude: longitude});
          console.log('위치 정보:', latitude, longitude);
          resolve(true);
        },
        error => {
          console.error('위치 에러:', error);
          Alert.alert('위치 에러', error.message);
          resolve(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  }, [location]);

  const init = useCallback(async () => {
    await requestNotificationPermission();
    await getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    init();
  }, [init]);

  return {location, init};
};

export default useGPSLocation;
