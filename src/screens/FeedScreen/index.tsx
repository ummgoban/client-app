import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import {getMarketList} from '@/apis';
import {BottomButton} from '@/components/common';
import {Market} from '@/components/feedPage';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {MarketType} from '@/types/Market';
import {RootStackParamList} from '@/types/StackNavigationType';

import {
  onForegroundMessageHandler,
  requestUserPermission,
  requestNotificationPermission,
  setBackgroundMessageHandler,
} from '@/utils/notification';

import S from './SearchBar.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const FeedScreen = ({navigation}: Props) => {
  const [marketList, setMarketList] = useState<MarketType[] | null>(null);

  const [location, setLocation] = useState<{
    userLatitude: number;
    userLongitude: number;
  } | null>(null);

  const fetchData = useCallback(async () => {
    const res = await getMarketList(
      0,
      10,
      location?.userLatitude,
      location?.userLongitude,
    );
    if (!res) {
      Alert.alert('가게내역받아오기실패.');
      return;
    }
    // TODO: 필터링 로직 추가
    setMarketList(
      res.markets.filter(
        market =>
          market.products.length && market.pickupEndAt && market.pickupStartAt,
      ),
    );
  }, [location]);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('Android 권한 요청 결과:', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert('Android 위치 권한이 허용되지 않았습니다.');
      }
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iOS 권한 요청 결과:', result);
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert('IOS 위치 권한이 허용되지 않았습니다.');
      }
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('위치 권한이 필요합니다.');
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
  }, [location, requestLocationPermission]);

  const initializeData = useCallback(async () => {
    const gotLocation = await getCurrentLocation();
    if (gotLocation) {
      console.log('fetch 실행......');
      await fetchData();
    }
  }, [getCurrentLocation, fetchData]);

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };

  const navigateMap = () => {
    if (!marketList || !marketList.length) {
      Alert.alert('가게 목록이 없습니다.');
      return;
    }
    const validCords = [
      {
        marketName: '현재위치',
        marketId: -1,
        latitude: location?.userLatitude || 37.582831666666664,
        longitude: location?.userLongitude || 127.06107333333334,
      },
      ...marketList
        .filter(
          market =>
            market.latitude != null &&
            market.longitude != null &&
            market.latitude >= -90 &&
            market.latitude <= 90 &&
            market.longitude >= -180 &&
            market.longitude <= 180 &&
            market.products.length &&
            market.products.some(p => p.stock),
        )
        .map(market => ({
          marketName: market.name,
          marketId: market.id,
          latitude: market.latitude,
          longitude: market.longitude,
        })),
    ];
    navigation.navigate('Detail', {
      screen: 'Map',
      params: {cords: validCords},
    });
  };

  const {refreshing, onRefresh} = usePullDownRefresh(initializeData);

  useEffect(() => {
    requestNotificationPermission();
    requestUserPermission();
    setBackgroundMessageHandler();
    onForegroundMessageHandler();
  }, [navigation]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (marketList === null) {
    return (
      <View>
        <Text>가게목록을 불러오지 못했습니다.</Text>
      </View>
    );
  } else if (marketList.length === 0) {
    return (
      <View>
        <Text>주변 가게 목록이 없습니다.</Text>
      </View>
    );
  }

  return (
    <S.Container>
      {/* TODO: 검색바 */}
      <S.SearchWrapper>{/* <SearchTab /> */}</S.SearchWrapper>
      <S.MarketWrapper
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {marketList.length === 0 ? (
          <Text>상품이 없습니다.</Text>
        ) : (
          marketList.map(market => (
            <Market key={market.id} onPress={onPressStore} market={market} />
          ))
        )}
      </S.MarketWrapper>
      <BottomButton onPress={navigateMap}>
        지도로 주변 가게 확인하기
      </BottomButton>
    </S.Container>
  );
};

export default FeedScreen;
