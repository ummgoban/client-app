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
      uri: __DEV__ ? 'http://172.30.1.34:4173' : 'https://ummgoban.com',
      title: 'webview',
    },
  });
}
