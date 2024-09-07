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

  flex: 1;
`;

const StoreImage = styled.Image`
  width: 64px;
  height: 64px;

  border-radius: 32px;
`;

const InfoHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StoreName = styled.Text`
  font-size: 20px;
  line-height: 130%;
  font-weight: 600;
`;

const OrderDetailButtonContainer = styled.View`
  width: max-content;
  height: 26px;

  box-sizing: border-box;

  border-radius: 15px;
  border: 1px solid #ebebeb;
`;

const OrderDetailButton = styled.TouchableOpacity``;

const OrderDetailButtonText = styled.Text`
  padding: 2px 10px;
  color: #222222;

  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.408px;
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

const HistoryTimelineContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const HistoryTimelineItem = styled.View`
  display: flex;
  flex-direction: row;
`;

const HistoryTimeline = ({
  title,
  timestamp,
  description,
}: {
  title: string;
  timestamp: number;
  description: string | null;
}) => {
  return (
    <HistoryTimelineItem>
      <Text>{title}</Text>
      <Text>{format(timestamp, 'HH시 mm분')}</Text>
      {description != null && <Text>{description}</Text>}
    </HistoryTimelineItem>
  );
};

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
                  <InfoHeader>
                    <StoreName>{order.store.name}</StoreName>
                    <OrderDetailButtonContainer>
                      <OrderDetailButton
                        onPress={() => Alert.alert('주문 상세 바로가기')}>
                        <OrderDetailButtonText>주문 상세</OrderDetailButtonText>
                      </OrderDetailButton>
                    </OrderDetailButtonContainer>
                  </InfoHeader>
                  <CreatedAt>{`${format(order.createdAt)}${
                    status != null ? ` · ${status}` : ''
                  }`}</CreatedAt>
                  <Description>{description}</Description>
                </ItemInfo>
              </HistoryItemSummary>
              <HistoryTimelineContainer>
                <HistoryTimeline
                  title="예약 접수"
                  timestamp={order.createdAt}
                  description={
                    order.pendingAt != null
                      ? '픽업 예약이 완료되었습니다.'
                      : null
                  }
                />
                {order.pendingAt != null && (
                  <HistoryTimeline
                    title="픽업 대기"
                    timestamp={order.pendingAt}
                    description={
                      order.doneAt != null
                        ? `${format(
                            order.pickupAt,
                            'HH시 mm분',
                          )}까지 가게로 방문해주세요.`
                        : null
                    }
                  />
                )}
                {order.doneAt != null && (
                  <HistoryTimeline
                    title="픽업 완료"
                    timestamp={order.doneAt}
                    description={`${format(
                      order.doneAt,
                      'HH시 mm분',
                    )}에 픽업이 완료되었습니다.`}
                  />
                )}
              </HistoryTimelineContainer>
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
