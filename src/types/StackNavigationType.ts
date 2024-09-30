import {ParamListBase} from '@react-navigation/native';

type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export interface HomeStackParamList extends ParamListBase {
  Feed: undefined;
  MyPage: undefined;
}

export interface RegisterStackParamList extends ParamListBase {
  Signup: undefined;
  Login: undefined;
}

export interface DetailStackParamList extends ParamListBase {
  Market: {marketId: number};
  Payment: undefined;
  OrderDone: {orderId: number};
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
}
