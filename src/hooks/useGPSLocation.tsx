import {useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {create} from 'zustand';

import {
  requestLocationPermission,
  requestNotificationPermission,
} from '@/utils/notification';

type LocationStore = {
  location: {
    userLatitude: number;
    userLongitude: number;
  } | null;
  loading: boolean;
  fetchLocation: () => Promise<boolean>;
};

const gpsLocationStore = create<LocationStore>(set => ({
  location: null,
  loading: false,
  fetchLocation: async () => {
    set({loading: true});

    const hasPermission = await requestLocationPermission();

    if (hasPermission !== 'granted') {
      Alert.alert('위치 권한이 허용되지 않아 기본 가게들을 조회하겠습니다');
      set({loading: false});

      return false;
    }

    const res = await new Promise<boolean>(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          set({location: {userLatitude: latitude, userLongitude: longitude}});
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

    set({loading: false});

    return res;
  },
}));

const useGPSLocation = () => {
  const {location, fetchLocation, loading} = gpsLocationStore();

  const init = useCallback(async () => {
    await requestNotificationPermission();
    await fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    init();
  }, [init]);

  return {location, init, loading};
};

export default useGPSLocation;
