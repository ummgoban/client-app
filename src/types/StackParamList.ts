import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type IntegrationStackParamList = RootStackParamList &
  HomeStackParamList &
  RegisterStackParamList;

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

type HomeStackParamList = {
  Feed: undefined;
  MyPage: undefined;
  Detail: {itemId: number};
};

type RegisterStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type {
  IntegrationStackParamList,
  RootStackParamList,
  HomeStackParamList,
  RegisterStackParamList,
  RootStackNavigationProp,
  RootStackRouteProp,
};
