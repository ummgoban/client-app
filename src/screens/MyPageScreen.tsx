import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {OrderHistory, Profile} from '../components/myPage';
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

  // TODO: fetch order history
  const historyList: OrderType[] = [
    {
      id: 1,
      store: {
        id: 1,
        name: 'store1',
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
          name: 'product2',
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
          name: 'product3',
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

  const profile = {
    name: '김영민',
    image: 'https://legacy.reactjs.org/logo-og.png',
  };

  return (
    <MyPageContainer>
      <Profile name={profile.name} image={profile.image} />
      <OrderHistory historyList={historyList} />
    </MyPageContainer>
  );
};

export default MyPageScreen;
