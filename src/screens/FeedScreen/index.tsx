import {useMarketList} from '@/apis/markets';
import {BottomButton} from '@/components/common';
import {Market} from '@/components/feedPage';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {RootStackParamList} from '@/types/StackNavigationType';
import {
  requestLocationPermission,
  requestNotificationPermission,
} from '@/utils/notification';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import S from './Feed.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const FeedScreen = ({navigation}: Props) => {
  const [location, setLocation] = useState<{
    userLatitude: number;
    userLongitude: number;
  } | null>(null);

  const {data, fetchNextPage, isFetchingNextPage, hasNextPage} = useMarketList({
    userLatitude: location?.userLatitude,
    userLongitude: location?.userLongitude,
  });

  const marketList = data ? data.pages.flatMap(page => page.markets) : [];

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

  const initializeData = useCallback(async () => {
    await requestNotificationPermission();
    await getCurrentLocation();
  }, [getCurrentLocation]);

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
      marketList
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

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const {refreshing, onRefresh} = usePullDownRefresh(initializeData);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (marketList === null) {
    return (
      <View>
        <ActivityIndicator animating={true} size="large" />
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
      <S.MarketWrapper>
        <FlatList
          data={marketList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item, index) => `${index}-${item.id.toString()}`}
          renderItem={({item}) => {
            if (!item) {
              return null;
            }
            return <Market market={item} onPress={onPressStore} />;
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <S.LastIndicatorItem>
                <ActivityIndicator size="small" animating={true} />
              </S.LastIndicatorItem>
            ) : null
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.6}
        />
      </S.MarketWrapper>
      <BottomButton onPress={navigateMap}>
        지도로 주변 가게 확인하기
      </BottomButton>
    </S.Container>
  );
};

export default FeedScreen;
