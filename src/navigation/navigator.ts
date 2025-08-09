import {
  DetailStackParamList,
  FeedStackParamList,
  HomeStackParamList,
  MyPageStackParamList,
  RegisterStackParamList,
  RootStackParamList,
} from '@/types/StackNavigationType';
import {StackNavigationProp} from '@react-navigation/stack';

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
        ? `http://192.168.66.12:5173/market/${marketId}`
        : 'https://ummgoban.com',
      title: 'webview',
    },
  });
}
