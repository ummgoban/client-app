import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl, Text, View, Dimensions} from 'react-native';
import MyLocationMap from '@/components/map/MyLocationMap';
import {getMarketList} from '@/apis';
import {Market, SearchTab} from '@/components/feedPage';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {MarketType} from '@/types/Market';
import {RootStackParamList} from '@/types/StackNavigationType';
// import NaverMapView, {Marker, Path} from 'react-native-naver-map';
import S from './SearchBar.style';
import {
  handleForegroundMessage,
  requestUserPermission,
  requestNotificationPermission,
  setBackgroundMessageHandler,
} from '@/utils/fcm';
import GeocodingExample from '@/components/map/GeocodingExample';
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

  // TODO: cursor pagination 무한 스크롤 구현
  const [marketList, setMarketList] = useState<MarketType[] | null>(null);
  const fetchData = useCallback(async () => {
    const res = await getMarketList();
    if (!res) {
      Alert.alert('가게내역받아오기실패.');
      return;
    }
    setMarketList(res.markets);
  }, []);

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
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
    // TODO: fcm permission 로직 위치 논의 필요
    requestNotificationPermission();
    const unsubscribe = handleForegroundMessage();
    requestUserPermission();
    setBackgroundMessageHandler();
    fetchData();
    return unsubscribe;
  }, [fetchData, navigation]);

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
          {/* <NaverMapView
            style={{width: '100%', height: '100%'}}
            center={{
              zoom: 10,
              tilt: 0,
              latitude:
                (dummyOrders[0].start.latitude + dummyOrders[0].end.latitude) /
                2,
              longitude:
                (dummyOrders[0].start.longitude +
                  dummyOrders[0].end.longitude) /
                2,
            }}>
            <Marker
              coordinate={{
                latitude: dummyOrders[0].start.latitude,
                longitude: dummyOrders[0].start.longitude,
              }}
              pinColor="blue"
            />
            <Path
              coordinates={[
                {
                  latitude: dummyOrders[0].start.latitude,
                  longitude: dummyOrders[0].start.longitude,
                },
                {
                  latitude: dummyOrders[0].end.latitude,
                  longitude: dummyOrders[0].end.longitude,
                },
              ]}
            />
            <Marker
              coordinate={{
                latitude: dummyOrders[0].end.latitude,
                longitude: dummyOrders[0].end.longitude,
              }}
            />
          </NaverMapView>
          <Text>hi</Text> */}
          <MyLocationMap dummyCords={dummyCords} />
          <GeocodingExample />
          <GeocodingExample />
        </View>
      </View>
    );
  }

  return (
    <S.Container>
      {/* <MyLocationMap dummyCords={dummyCords} /> */}
      <GeocodingExample />
      <GeocodingExample />

      <S.SearchWrapper>
        <SearchTab />
      </S.SearchWrapper>
      <S.MarketWrapper
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {marketList.length === 0 ? (
          // TODO: 상품이 없을 때 렌더링
          <Text>상품이 없습니다.</Text>
        ) : (
          marketList.map(market => (
            <Market key={market.id} onPress={onPressStore} market={market} />
          ))
        )}
      </S.MarketWrapper>
    </S.Container>
  );
};
export default FeedScreen;
