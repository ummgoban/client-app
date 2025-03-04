import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {RefreshControl, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';

import {useSubscribeList} from '@/apis/markets';

import useGPSLocation from '@/hooks/useGPSLocation';
import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';

import CustomActivityIndicator from '@/components/common/ActivityIndicator';
import EmptyComponent from '@/components/common/EmptyComponent';
import SubscribeMarketCard from '@/components/subscribePage/SubscribeMarketCard';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './SubscribeScreen.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Subscribe'>;
};

const SubscribeScreen = ({navigation}: Props) => {
  const {location} = useGPSLocation();

  const {
    data: subscribeList,
    refetch,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSubscribeList({
    userLatitude: location?.userLatitude,
    userLongitude: location?.userLongitude,
  });

  const markets = subscribeList?.pages
    ? subscribeList.pages.flatMap(page => page.markets)
    : [];

  const {profile} = useProfile();

  const {refreshing, onRefresh} = usePullDownRefresh(async () => {
    await refetch();
  });

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'MarketDetail',
      params: {marketId},
    });
  };

  const handleEndReached = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  if (!profile) {
    return (
      <EmptyComponent
        title="로그인 후 가게를 찜해보세요."
        onPress={() => navigation.navigate('Register', {screen: 'Login'})}
        buttonText="로그인하러 가기"
      />
    );
  }

  if (isLoading) {
    <View>
      <CustomActivityIndicator />
    </View>;
  }

  if (!markets) {
    return (
      <EmptyComponent
        title="찜 리스트를 불러오는데 실패했습니다."
        onPress={() => navigation.goBack()}
        buttonText="뒤로 가기"
      />
    );
  }

  if (!markets.length) {
    return (
      <EmptyComponent
        title="찜한 가게가 없습니다."
        onPress={() => navigation.navigate('Feed', {screen: 'Market'})}
        buttonText="주문하러 가기"
      />
    );
  }

  return (
    <S.SubscribeContainer>
      <S.SubscribeMarketCartWrapper>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={markets}
          keyExtractor={(item, index) => `${index}-${item.id.toString()}`}
          renderItem={({item}) => {
            if (!item) return null;
            return (
              <SubscribeMarketCard
                key={item.id}
                marketId={item.id}
                name={item.name}
                address={item.address}
                specificAddress={item.specificAddress}
                openAt={item.openAt}
                closeAt={item.closeAt}
                // TODO: 가게 대표 이미지로 변경, 현재 response 부재
                thumbnailImage={item.products[0]?.image}
                onPress={onPressStore}
              />
            );
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
      </S.SubscribeMarketCartWrapper>
    </S.SubscribeContainer>
  );
};

export default SubscribeScreen;
