import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl, Text, View, Dimensions} from 'react-native';
import MyLocationMap from '@/components/map/MyLocationMap';
import {getMarketList} from '@/apis';
import {Market, SearchTab} from '@/components/feedPage';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {MarketType} from '@/types/Market';
import {RootStackParamList} from '@/types/StackNavigationType';
import {Platform, PermissionsAndroid} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {BottomButton} from '@/components/common';
// import NaverMapView, {Marker, Path} from 'react-native-naver-map';
import S from './SearchBar.style';
import {
  handleForegroundMessage,
  requestUserPermission,
  requestNotificationPermission,
  setBackgroundMessageHandler,
} from '@/utils/fcm';
// import MyLocationMap from '@/components/map/MyLocationMap';
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const FeedScreen = ({navigation}: Props) => {
  const dummyCords = [
    {
      marketId: '1',
      latitude: 37.566537,
      longitude: 127.0848516666666,
    },
    {
      marketId: '2',
      latitude: 37.586537,
      longitude: 127.0948516666666,
    },
  ];
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [marketList, setMarketList] = useState<MarketType[] | null>(null);
  const [location, setLocation] = useState<{
    userLatitude: number;
    userLongtitude: number;
  } | null>(null);

  const fetchData = useCallback(async () => {
    if (hasFetchedData) return;
    const res = await getMarketList(
      0,
      10,
      location?.userLatitude,
      location?.userLongtitude,
    );
    if (!res) {
      Alert.alert('가게내역받아오기실패.');
      return;
    }
    setMarketList(res.markets);
    console.log(res.markets);
    setHasFetchedData(true);
  }, [location, hasFetchedData]);

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          userLatitude: position.coords.latitude,
          userLongtitude: position.coords.longitude,
        });
        console.log(position.coords);
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
    navigation.navigate('Detail', {
      screen: 'Map',
      params: {dummyCords},
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
        <View
          style={{
            width: Dimensions.get('window').width - 30,
            height: 200,
            marginTop: 10,
          }}>
          <MyLocationMap dummyCords={dummyCords} />
        </View>
      </View>
    );
  }

  return (
    <S.Container>
      <MyLocationMap dummyCords={dummyCords} />
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
