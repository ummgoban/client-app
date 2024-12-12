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
    orderId: string;
    products: OrderType['products'];
    originPrice: number;
    discountPrice: number;
  };
  Map: {
    cords: {
      marketName: string;
      marketId: number;
      latitude: number;
      longitude: number;
    }[];
  };
  OrderDetail: {
    ordersId: string;
  };
}

export interface CartStackParamList extends ParamListBase {
  Cart: undefined;
}

export interface MyPageStackParamList extends ParamListBase {
  MyPageRoot: undefined;
  Setting: undefined;
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
  MyPage: StackParamType<MyPageStackParamList>;
}
