import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {OrderHistory, Profile} from '../components/myPage';
import usePullDownRefresh from '../hooks/usePullDownRefresh';
import {OrderType} from '../types/OrderType';
import {
  HomeStackParamList,
  RootStackParamList,
} from '../types/StackNavigationType';

type Props = StackScreenProps<
  HomeStackParamList & RootStackParamList,
  'MyPage'
>;

const MyPageContainer = styled.ScrollView``;

const dummyHistoryList: OrderType[] = [
  {
    id: 1,
    store: {
      id: 1,
      name: 'very long store name very long store name',
      image: 'https://legacy.reactjs.org/logo-og.png',
    },
    product: [
      {
        id: 1,
        name: 'product1',
        price: 1000,
        count: 3,
      },
      {
        id: 2,
        name: 'product2',
        price: 2000,
        count: 1,
      },
    ],
    pickupAt: 1719545600000,
    createdAt: 1709545600000,
    status: 'ORDERED',
  },
  {
    id: 2,
    store: {
      id: 2,
      name: 'store2',
      image: 'https://legacy.reactjs.org/logo-og.png',
    },
    product: [
      {
        id: 2,
        name: '띄어쓰기가없는엄청나게긴음식이름은어떻게해야될까요없는엄청나게긴음식이름은어떻게해야될까요',
        price: 2000,
        count: 1,
      },
    ],
    pickupAt: 1614639000000,
    createdAt: 1610639000000,
    pendingAt: 1612639000000,
    status: 'PENDING',
  },
  {
    id: 3,
    store: {
      id: 3,
      name: 'store3',
      image: 'https://legacy.reactjs.org/logo-og.png',
    },
    product: [
      {
        id: 3,
        name: 'very long product name + very long product name, very long product name, very long product name',
        price: 3000,
        count: 1,
      },
    ],
    pickupAt: 1610718400000,
    createdAt: 1609718400000,
    pendingAt: 1609718400000,
    doneAt: 1611718400000,
    status: 'DONE',
  },
];

// TODO: fetch order history
const fetchOrderHistory = (): Promise<OrderType[] | null> => {
  return new Promise(async resolve => {
    await new Promise(_ => setTimeout(_, 1000));
    console.log('fetch order history');
    resolve(dummyHistoryList);
  });
};

const UserMyPage = () => {
  const [historyList, setHistoryList] = React.useState<OrderType[]>([]);

  const {refreshing, onRefresh} = usePullDownRefresh(async () => {
    console.log('refreshing start');
    const res = await fetchOrderHistory();
    if (!res) {
      Alert.alert('주문 내역을 불러오는데 실패했습니다.');
      return;
    }

    setHistoryList(res);
  });

  // TODO: fetch user profile
  const profile = {
    name: '김영민',
    image: 'https://legacy.reactjs.org/logo-og.png',
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchOrderHistory();
      if (!res) {
        Alert.alert('주문 내역을 불러오는데 실패했습니다.');
        return;
      }

      setHistoryList(res);
    };

    fetchData();
  }, []);

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
  // TODO: fetch user session
  const isLogin = true;

  if (!isLogin) {
    return (
      <View>
        <Button
          onPress={() => navigation.navigate('Register', {screen: 'Login'})}>
          Go to Login
        </Button>
      </View>
    );
  }

  return <UserMyPage />;
};

export default MyPageScreen;
