import React, {useState, useCallback, useEffect, useRef} from 'react';
import {AppState, AppStateStatus, Alert, Linking} from 'react-native';
import S from './SettingScreen.style';
import {
  changeLocationPermission,
  changeNotificationPermission,
  isNotificationPermissionEnabled,
  requestLocationPermission,
} from '@/utils/notification';

const SettingScreen = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isLocationOn, setIsLocationOn] = useState<
    'granted' | 'never_ask_again' | 'denied' | null
  >(null);

  const initializeNotificationPermission = useCallback(async () => {
    try {
      const isEnabled = await isNotificationPermissionEnabled();
      setIsNotificationOn(isEnabled);
    } catch (error) {
      console.error('체크 실패', error);
    }
  }, []);

  const isPermissionRequestedRef = useRef(false);

  const initializeLocationPermission = useCallback(async () => {
    if (isPermissionRequestedRef.current) {
      console.log('권한 요청 중복 실행 방지');
      return;
    }

    console.log('initializeLocationPermission 실행');
    try {
      const permissionStatus = await requestLocationPermission();

      if (permissionStatus === 'granted') {
        setIsLocationOn('granted');
        console.log('위치 권한 허용됨');
      } else {
        console.log('위치 권한 요청: never_ask_again');
        Alert.alert(
          '위치 권한 필요',
          '위치 권한을 활성화하려면 설정에서 권한을 허용해주세요.',
          [
            {text: '설정 열기', onPress: () => Linking.openSettings()},
            {text: '취소', style: 'cancel'},
          ],
        );
        isPermissionRequestedRef.current = true;
      }
    } catch (error) {
      console.error('위치 권한 초기화 실패:', error);
    }
  }, []);

  useEffect(() => {
    initializeNotificationPermission();
    initializeLocationPermission();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('AppState 변경:', nextAppState);
      if (nextAppState === 'active') {
        initializeNotificationPermission();
        initializeLocationPermission();
      } else if (nextAppState === 'background') {
        console.log('앱이 백그라운드로 이동');
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      console.log('AppState 이벤트 클린업');
      subscription.remove();
    };
  }, [initializeNotificationPermission, initializeLocationPermission]);

  const handleNotificationSwitch = async () => {
    try {
      await changeNotificationPermission();
      const newIsNotificationOn = await isNotificationPermissionEnabled();
      if (newIsNotificationOn !== isNotificationOn) {
        setIsNotificationOn(newIsNotificationOn);
      }
    } catch (error) {
      console.error('알림 상태 변경 실패', error);
    }
  };

  const handleLocationSwitch = async () => {
    try {
      await changeLocationPermission();
      const newLocationPermission = await requestLocationPermission();
      if (newLocationPermission !== isLocationOn) {
        setIsLocationOn(newLocationPermission);
      }
    } catch (error) {
      console.error('알림 상태 변경 실패', error);
    }
  };

  return (
    <S.Container>
      <S.SettingItemList>
        <S.SettingItemTitle>알림</S.SettingItemTitle>
        <S.SettingItem>
          <S.SettingItemDescriptionContainer>
            <S.SettingItemDescriptionTitle>
              찜한 가게 알림
            </S.SettingItemDescriptionTitle>
            <S.SettingItemDescription>
              찜한 가게에 새로운 상품이 등록되면 알림을 보내드려요
            </S.SettingItemDescription>
          </S.SettingItemDescriptionContainer>
          <S.SwitchButton
            value={isNotificationOn}
            onChange={handleNotificationSwitch}
          />
        </S.SettingItem>
        <S.SettingItemTitle>위치</S.SettingItemTitle>
        <S.SettingItem>
          <S.SettingItemDescriptionContainer>
            <S.SettingItemDescriptionTitle>
              현재 위치
            </S.SettingItemDescriptionTitle>
            <S.SettingItemDescription>
              현재 위치를 사용하여 가까운 가게를 추천해드려요
            </S.SettingItemDescription>
          </S.SettingItemDescriptionContainer>
          <S.SwitchButton
            value={isLocationOn === 'granted' ? true : false}
            onChange={handleLocationSwitch}
          />
        </S.SettingItem>
      </S.SettingItemList>
    </S.Container>
  );
};

export default SettingScreen;
