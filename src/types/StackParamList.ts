type StackParamType<T> = {
  screen?: keyof T;
  params?: T[keyof T];
};

export type HomeStackParamList = {
  Feed: undefined;
  MyPage: undefined;
  Detail: {itemId: number};
};

export type RegisterStackParamList = {
  Signup: undefined;
  Login: undefined;
};

export type RootStackParamList = {
  Home: StackParamType<HomeStackParamList>;
  Register: StackParamType<RegisterStackParamList>;
};
