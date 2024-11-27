import React, {useState, useCallback, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import S from './SettingScreen.style';
import {handleNotificationPermission} from '@/utils/notification';

const SettingScreen = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isLocationOn, setIsLocationOn] = useState(false);

  const initializeNotificationPermission = useCallback(async () => {
    try {
      const status = await messaging().hasPermission();
      const isEnabled =
        status === messaging.AuthorizationStatus.AUTHORIZED ||
        status === messaging.AuthorizationStatus.PROVISIONAL;
      setIsNotificationOn(isEnabled);
    } catch (error) {
      console.error('체크 실패', error);
    }
  }, []);

  useEffect(() => {
    initializeNotificationPermission();
  }, [initializeNotificationPermission]);

  // TODO: Implement handleNotificationSwitch function
  const handleNotificationSwitch = async () => {
    await handleNotificationPermission(isNotificationOn);
    setIsNotificationOn(prev => !prev);
  };

  // TODO: Implement handleLocationSwitch function
  const handleLocationSwitch = async () => {
    setIsLocationOn(prev => !prev);
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
            value={isLocationOn}
            onChange={handleLocationSwitch}
          />
        </S.SettingItem>
      </S.SettingItemList>
    </S.Container>
  );
};

export default SettingScreen;
