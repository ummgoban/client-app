import {ParamListBase} from '@react-navigation/native';
import {OrderType} from './OrderType';

type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export interface HomeStackParamList extends ParamListBase {
  Feed: undefined;
  MyPage: undefined;
  OrderHistory: undefined;
  Subscribe: undefined;
}

export interface RegisterStackParamList extends ParamListBase {
  Signup: undefined;
  Login: undefined;
}

export interface DetailStackParamList extends ParamListBase {
  Market: {marketId: number};
  Payment: undefined;
  OrderDone: {
    orderId: number;
    products: OrderType['products'];
    originPrice: number;
    discountPrice: number;
  };
}

export interface CartStackParamList extends ParamListBase {
  Cart: undefined;
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
}
