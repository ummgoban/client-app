import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {OrderType} from '../types/OrderType';
import {
  HomeStackParamList,
  RootStackParamList,
} from '../types/StackNavigationType';

type Props = StackScreenProps<
  HomeStackParamList & RootStackParamList,
  'MyPage'
>;

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

const OrderHistory = () => {
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
      createdAt: 1609632000000,
      doneAt: 1609632000000,
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
      createdAt: 1609718400000,
      doneAt: 1609718400000,
      status: 'DONE',
    },
  ];

  return (
    <View>
      <Text>주문 내역</Text>
      <View style={{display: 'flex', gap: 12}}>
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

          return (
            <View key={order.id}>
              <View style={{display: 'flex', flexDirection: 'row', gap: 12}}>
                <Image
                  source={{uri: order.store.image}}
                  width={64}
                  height={64}
                />
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text>{order.store.name}</Text>
                  <Text>{order.createdAt}</Text>
                  <Text>{description}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const MyPageScreen = ({navigation}: Props) => {
  // TODO: fetch user session
  const isLogin = true;

  if (!isLogin) {
    return (
      <View>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Register', {screen: 'Login'})}
        />
      </View>
    );
  }

  return (
    <View>
      <Profile />
      <OrderHistory />
    </View>
  );
};

export default MyPageScreen;
