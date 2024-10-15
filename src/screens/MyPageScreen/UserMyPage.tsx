import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';

import {OrderType} from '@/types/OrderType';
import {RootStackParamList} from '@/types/StackNavigationType';
import {UserType} from '@/types/UserType';
import {getOrderHistory} from '@apis/Order';
import {OrderHistory, Profile} from '@components/myPage';
import usePullDownRefresh from '@hooks/usePullDownRefresh';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import S from './UserMyPage.style';

const UserMyPage = ({profile}: {profile: UserType}) => {
  const [historyList, setHistoryList] = useState<OrderType[] | null>(null);

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Detail'>>();

  const fetchData = useCallback(async () => {
    const res = await getOrderHistory();
    if (!res) {
      Alert.alert('주문 내역을 불러오는데 실패했습니다.');
      return;
    }

    setHistoryList(res);
  }, []);

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <S.MyPageContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Profile name={profile.name} image={profile.image} />
      <OrderHistory
        historyList={historyList}
        onPressMarket={marketId =>
          navigation.navigate('Detail', {
            screen: 'Market',
            params: {marketId: marketId},
          })
        }
      />
    </S.MyPageContainer>
  );
};

export default UserMyPage;
