export type PostMessageMethodType =
  | 'INIT'
  | 'SAFE_AREA_INSETS'
  | 'WEB_NAVIGATION'
  | 'NATIVE_HISTORY'
  | 'AUTHORIZATION';

export interface PostMessagePayloadType {
  type: PostMessageMethodType;
  payload?: object;
}

export interface PostMessageSafeAreaInsetsPayload
  extends PostMessagePayloadType {
  type: 'SAFE_AREA_INSETS';
  payload: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface PostMessageInitPayload extends PostMessagePayloadType {
  type: 'INIT';
  payload: {
    /**
     * platform
     */
    platform: 'ios' | 'android';
    /**
     * app package version
     */
    version: string;
    /**
     * UTC (ms)
     */
    ts: number;
  };
}

export interface PostMessageNavigationPayload extends PostMessagePayloadType {
  type: 'WEB_NAVIGATION';
  payload: {
    screen: string;
    params?: object;
  };
}

export interface PostMessageNativeHistoryPayload
  extends PostMessagePayloadType {
  type: 'NATIVE_HISTORY';
  payload: {
    screen: string;
    params?: object;
  };
}

export interface PostMessageAuthorizationPayload
  extends PostMessagePayloadType {
  type: 'AUTHORIZATION';
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

export type PostMessagePayload<T extends PostMessageMethodType> =
  T extends 'SAFE_AREA_INSETS'
    ? PostMessageSafeAreaInsetsPayload
    : T extends 'INIT'
      ? PostMessageInitPayload
      : T extends 'WEB_NAVIGATION'
        ? PostMessageNavigationPayload
        : T extends 'NATIVE_HISTORY'
          ? PostMessageNativeHistoryPayload
          : T extends 'AUTHORIZATION'
            ? PostMessageAuthorizationPayload
            : never;
