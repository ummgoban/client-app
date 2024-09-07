import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {OrderType} from '../types/OrderType';
import {
  HomeStackParamList,
  RootStackParamList,
} from '../types/StackNavigationType';
import {format} from '../utils/date';

type Props = StackScreenProps<
  HomeStackParamList & RootStackParamList,
  'MyPage'
>;

const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const ProfileImage = styled.Image`
  width: 64px;
  height: 64px;

  border-radius: 32px;
`;

const ProfileInfo = styled.View`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Profile = ({name, image}: {name: string; image: string}) => {
  return (
    <ProfileContainer>
      <ProfileImage source={{uri: image}} width={64} height={64} />
      <ProfileInfo>
        <Text>{`${name} 님`}</Text>
        <Button onPress={() => Alert.alert('주문 내역으로 이동')}>
          주문 내역
        </Button>
      </ProfileInfo>
    </ProfileContainer>
  );
};

const OrderContainer = styled.View`
  display: flex;
  margin: 20px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  line-height: 28.5px;
  font-weight: 600;

  margin-bottom: 12px;
`;

const HistoryList = styled.View`
  display: flex;
  gap: 12px;
`;

const HistoryItem = styled.View`
  display: flex;
  gap: 24px;
`;

const HistoryItemSummary = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const ItemInfo = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StoreImage = styled.Image`
  width: 64px;
  height: 64px;

  border-radius: 32px;
`;

const StoreName = styled.Text`
  font-size: 20px;
  line-height: 130%;
  font-weight: 600;
`;

const CreatedAt = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;

  color: #b5b5b5;
`;

const Description = styled.Text`
  font-size: 14px;
  line-height: 130%;
`;

const OrderHistory = ({historyList}: {historyList: OrderType[]}) => {
  return (
    <OrderContainer>
      <Title>진행중인 주문</Title>
      <HistoryList>
        {historyList.map(order => {
          const representProduct = order.product[0].name;
          const productLength = order.product.length;

          const sumOfPrice = order.product
            .reduce((acc, curr) => acc + curr.price, 0)
            .toLocaleString();

          const description = `${representProduct} ${
            productLength > 1
              ? `외 ${productLength - 1}개`
              : `${order.product[0].count}개`
          } ${sumOfPrice}원`;

          const status =
            order.status === 'ORDERED'
              ? '예약완료'
              : order.status === 'PENDING'
              ? '픽업대기'
              : order.status === 'DONE'
              ? '픽업완료'
              : order.status === 'CANCEL'
              ? '주문취소'
              : null; // not reachable

          return (
            <HistoryItem key={order.id}>
              <HistoryItemSummary>
                <StoreImage
                  source={{uri: order.store.image}}
                  width={64}
                  height={64}
                />
                <ItemInfo>
                  <StoreName>{order.store.name}</StoreName>
                  <CreatedAt>{`${format(order.createdAt)}${
                    status != null ? ` · ${status}` : ''
                  }`}</CreatedAt>
                  <Description>{description}</Description>
                </ItemInfo>
              </HistoryItemSummary>
            </HistoryItem>
          );
        })}
      </HistoryList>
    </OrderContainer>
  );
};

const MyPageContainer = styled.View`
  margin: 0 24px;
`;

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
      createdAt: 1609545600000,
      doneAt: 1609545600000,
      status: 'ORDERED',
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
      createdAt: 1609718400000,
      doneAt: 1609718400000,
      status: 'DONE',
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
      createdAt: 1610639000000,
      doneAt: 1615649000000,
      status: 'PENDING',
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
