import {StackNavigationProp} from '@react-navigation/stack';

import {
  DetailStackParamList,
  FeedStackParamList,
  HomeStackParamList,
  MyPageStackParamList,
  RegisterStackParamList,
  RootStackParamList,
} from '@/types/StackNavigationType';
import Config from 'react-native-config';

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
      uri: `${Config.WEBVIEW_URL}/market/${marketId}`,
      title: `맘찬픽 가게`,
    },
  });
}
