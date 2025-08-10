import {StackNavigationProp} from '@react-navigation/stack';

import {
  DetailStackParamList,
  FeedStackParamList,
  HomeStackParamList,
  MyPageStackParamList,
  RegisterStackParamList,
  RootStackParamList,
} from '@/types/StackNavigationType';

export function routeToDetail(
  navigation: StackNavigationProp<
    | RootStackParamList
    | HomeStackParamList
    | FeedStackParamList
    | RegisterStackParamList
    | DetailStackParamList
    | MyPageStackParamList
  >,
  marketId: number,
) {
  navigation.navigate('Detail', {
    screen: 'MarketDetail',
    params: {marketId},
    webview: {
      uri: __DEV__
        ? `http://192.168.0.12:5173/market/${marketId}`
        : // `http://192.168.0.12:5173`
          'https://ummgoban.com',
      title: 'webview',
    },
  });
}
