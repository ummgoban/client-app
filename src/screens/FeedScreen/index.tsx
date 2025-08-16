import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Alert, RefreshControl, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';

import MapIcon from '@/assets/icons/map-regular.svg';

import theme from '@/context/theme';

import {useMarketList} from '@/apis/markets';

import FeedBottomFloatingButton from '@/components/common/FeedBottomFloatingButton';
import {Market} from '@/components/feedPage';

import useGPSLocation from '@/hooks/useGPSLocation';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';

import {RootStackParamList} from '@/types/StackNavigationType';

import {routeToDetail} from '@/navigation/navigator';

import S from './Feed.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const FeedScreen = ({navigation}: Props) => {
  const {location, init: initLocation} = useGPSLocation();

  const {data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading} =
    useMarketList({
      userLatitude: location?.userLatitude,
      userLongitude: location?.userLongitude,
    });

  const marketList = data ? data.pages.flatMap(page => page.markets) : [];

  const onPressStore = (marketId: number) => {
    routeToDetail(navigation, marketId);
  };

  const navigateMap = () => {
    if (!marketList || !marketList.length) {
      Alert.alert('가게 목록이 없습니다.');
      return;
    }

    const validCords = [
      // 현재 위치 정보
      {
        marketName: '현재위치',
        marketId: -1,
        latitude: location?.userLatitude || 37.582831666666664,
        longitude: location?.userLongitude || 127.06107333333334,
      },
      // 유효한 마켓 정보 필터링 및 변환
      ...marketList
        .filter(market => {
          // 위도/경도 유효성 검사
          const hasValidCoordinates =
            market.latitude != null &&
            market.longitude != null &&
            market.latitude >= -90 &&
            market.latitude <= 90 &&
            market.longitude >= -180 &&
            market.longitude <= 180;

          // 재고 있는 상품 확인
          const hasProductsInStock =
            market.products.length > 0 && market.products.some(p => p.stock);

          return hasValidCoordinates && hasProductsInStock;
        })
        .map(market => ({
          marketName: market.name,
          marketId: market.id,
          latitude: market.latitude,
          longitude: market.longitude,
        })),
    ];

    navigation.navigate('Feed', {
      screen: 'Map',
      params: {cords: validCords},
    });
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const {refreshing, onRefresh} = usePullDownRefresh(initLocation);

  if (marketList === null || isLoading) {
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
          removeClippedSubviews={false}
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
      <FeedBottomFloatingButton
        onPress={navigateMap}
        Icon={<MapIcon color={theme.colors.dark} width={18} height={18} />}
        label="지도보기"
      />
    </S.Container>
  );
};

export default FeedScreen;
