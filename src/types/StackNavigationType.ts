type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export type HomeStackParamList = {
  Feed: undefined;
  MyPage: undefined;
};

export type RegisterStackParamList = {
  Signup: undefined;
  Login: undefined;
};

export type DetailStackParamList = {
  Store: {storeId: number};
};

export type RootStackParamList = {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
  Detail: StackParamType<DetailStackParamList>;
};
