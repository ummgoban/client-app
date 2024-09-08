import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {getOrderHistory} from '../api/Order';
import {getUserProfile} from '../api/User';
import {OrderHistory, Profile} from '../components/myPage';
import usePullDownRefresh from '../hooks/usePullDownRefresh';
import {OrderType} from '../types/OrderType';
import {
  HomeStackParamList,
  RootStackParamList,
} from '../types/StackNavigationType';
import {UserType} from '../types/UserType';

type Props = StackScreenProps<
  HomeStackParamList & RootStackParamList,
  'MyPage'
>;

const MyPageContainer = styled.ScrollView``;

const UserMyPage = ({profile}: {profile: UserType}) => {
  const [historyList, setHistoryList] = React.useState<OrderType[] | null>(
    null,
  );

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
    <MyPageContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Profile name={profile.name} image={profile.image} />
      <OrderHistory historyList={historyList} />
    </MyPageContainer>
  );
};

const MyPageScreen = ({navigation}: Props) => {
  const [profile, setProfile] = React.useState<UserType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getUserProfile();
      if (!res) {
        Alert.alert('프로필을 불러오는데 실패했습니다.');
        return;
      }

      setProfile(res);
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <View>
        <Button
          onPress={() => navigation.navigate('Register', {screen: 'Login'})}>
          Go to Login
        </Button>
      </View>
    );
  }

  return <UserMyPage profile={profile} />;
};

export default MyPageScreen;
