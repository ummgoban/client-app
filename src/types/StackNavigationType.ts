import {ParamListBase} from '@react-navigation/native';
import {OrderType} from './OrderType';
import {ProductType} from './ProductType';

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
  MarketDetail: {marketId: number};
  Payment: undefined;
  OrderDone: {
    orderId: string;
    products: OrderType['products'];
    originPrice: number;
    discountPrice: number;
  };
  OrderDetail: {
    ordersId: string;
  };
  ReviewCreate: {
    orderId: string;
    marketName: string;
    reviewContents: (ProductType & {count: number})[];
    marketId: number;
  };
  MarketReview: {
    marketId: number;
  };
}

export interface FeedStackParamList extends ParamListBase {
  Market: undefined;
  Map: {
    cords: {
      marketName: string;
      marketId: number;
      latitude: number;
      longitude: number;
    }[];
  };
}

export interface CartStackParamList extends ParamListBase {
  Cart: undefined;
}

export interface MyPageStackParamList extends ParamListBase {
  MyPageRoot: undefined;
  Setting: undefined;
  Notice: undefined;
  Policy: undefined;
  CustomerReview: {
    memberId: number;
  };
  Nickname: undefined;
}

export interface RootStackParamList extends ParamListBase {
  Home: StackParamType<HomeStackParamList>;
  Feed: StackParamType<FeedStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
  MyPage: StackParamType<MyPageStackParamList>;
}
