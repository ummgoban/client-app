import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl, Text, View} from 'react-native';
import {getMarketList} from '@/apis';
import {Market, SearchTab} from '@/components/feedPage';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {MarketType} from '@/types/Market';
import {RootStackParamList} from '@/types/StackNavigationType';
import {Platform, PermissionsAndroid} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {BottomButton} from '@/components/common';
import S from './SearchBar.style';
import {
  handleForegroundMessage,
  requestUserPermission,
  requestNotificationPermission,
  setBackgroundMessageHandler,
} from '@/utils/fcm';
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
    setMarketList(res.markets);
  }, [location]);

  // const getCurrentLocation = useCallback(() => {
  //   console.log('Get current location...');
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setLocation({
  //         userLatitude: position.coords.latitude,
  //         userLongitude: position.coords.longitude,
  //       });
  //     },
  //     error => {
  //       console.log(error.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //       maximumAge: 0,
  //     },
  //   );
  // }, []);

  const startLocationTracking = useCallback(() => {
    console.log('location chagned');
    Geolocation.watchPosition(
      position => {
        setLocation({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  }, []);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('Android 권한 요청 결과:', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // getCurrentLocation();
        startLocationTracking();
      } else {
        console.log('위치 권한이 허용되지 않았습니다.');
      }
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iOS 권한 요청 결과:', result);
      if (result === RESULTS.GRANTED) {
        // getCurrentLocation();
        startLocationTracking();
      } else {
        console.log('위치 권한이 허용되지 않았습니다.');
      }
    }
  }, [startLocationTracking]);

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };

  const navigateMap = () => {
    if (!location) {
      Alert.alert(
        '위치 정보가 없어 기본가게들을 열람합니다. 권한을 허용해주세요',
      );
      return;
    }
    if (!marketList || !marketList.length) {
      Alert.alert('가게 목록이 없습니다.');
      return;
    }
    const validCords = [
      {
        marketName: '현재위치',
        marketId: '-1',
        latitude: location?.userLatitude || 37.582831666666664,
        longitude: location?.userLongitude || 127.06107333333334,
      },
      ...marketList!
        .filter(
          market =>
            market.latitude != null &&
            market.longitude != null &&
            market.latitude >= -90 &&
            market.latitude <= 90 &&
            market.longitude >= -180 &&
            market.longitude <= 180,
        )
        .map(market => ({
          marketName: market.name,
          marketId: market.id.toString(),
          latitude: market.latitude,
          longitude: market.longitude,
        })),
    ];
    navigation.navigate('Detail', {
      screen: 'Map',
      params: {cords: validCords},
    });
  };

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  useEffect(() => {
    navigation.setOptions({
      title: '주변 가게 조회',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Arial',
      },
    });

    requestNotificationPermission();
    requestUserPermission();
    requestLocationPermission();
    const unsubscribe = handleForegroundMessage();
    setBackgroundMessageHandler();

    return unsubscribe;
  }, [navigation, requestLocationPermission]);

  useEffect(() => {
    fetchData();
  }, [location, fetchData]);

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
      <S.SearchWrapper>
        <SearchTab />
      </S.SearchWrapper>
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
