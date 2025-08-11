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
        ? `http://172.20.10.6:5173/market/${marketId}`
        : // `http://172.20.10.6:5173`
          'https://ummgoban.com',
      title: 'webview',
    },
  });
}
