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
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [marketList, setMarketList] = useState<MarketType[] | null>(null);
  const [location, setLocation] = useState<{
    userLatitude: number;
    userLongitude: number;
  } | null>(null);

  const fetchData = useCallback(async () => {
    if (hasFetchedData) return;
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

    setHasFetchedData(true);
  }, [location, hasFetchedData]);

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
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
        timeout: 15000,
        maximumAge: 0,
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
        getCurrentLocation();
      } else {
        console.log('위치 권한이 허용되지 않았습니다.');
      }
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iOS 권한 요청 결과:', result);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('위치 권한이 허용되지 않았습니다.');
      }
    }
  }, [getCurrentLocation]);

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };

  const navigateMap = () => {
    const validDummyCords = [
      {
        marketName: '현재위치',
        marketId: '-1',
        latitude: location?.userLatitude || 0,
        longitude: location?.userLongitude || 0,
      },
      ...marketList!
        .filter(market => market.latitude && market.longitude)
        .map(market => ({
          marketName: market.name,
          marketId: market.id.toString(),
          latitude: market.latitude,
          longitude: market.longitude,
        })),
    ];
    navigation.navigate('Detail', {
      screen: 'Map',
      params: {dummyCords: validDummyCords},
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
    const unsubscribe = handleForegroundMessage();
    setBackgroundMessageHandler();
    requestLocationPermission();

    return unsubscribe;
  }, [navigation, requestLocationPermission]);

  useEffect(() => {
    if (location && !hasFetchedData) {
      fetchData();
    }
  }, [location, hasFetchedData, fetchData]);

  if (!marketList) {
    return (
      <View>
        <Text>가게목록을 불러오는데 실패했습니다.</Text>
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
