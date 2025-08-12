export type ReceiveMessageMethodType =
  | 'NATIVE_NAVIGATION'
  | 'NATIVE_GO_BACK'
  | 'AUTHORIZATION'
  | 'PLAIN'
  | 'UNKNOWN';

export interface ReceiveMessagePayloadType {
  type: ReceiveMessageMethodType;
  payload?: object;
}

/**
 * Use React Native Stack Navigation
 * - Navigation
 */
export interface ReceiveMessageNativeNavigationPayload
  extends ReceiveMessagePayloadType {
  type: 'NATIVE_NAVIGATION';
  payload: {
    screen: string;
    params?: object;
    callbackState?: {
      screen: string;
      params?: object;
      webUri: string;
    };
  };
}

/**
 * Use React Native Stack Navigation
 * - Go Back Navigation
 */
export interface ReceiveMessageNativeGoBackPayload
  extends ReceiveMessagePayloadType {
  type: 'NATIVE_GO_BACK';
}

export interface ReceiveMessageAuthorizedPayload
  extends ReceiveMessagePayloadType {
  type: 'AUTHORIZATION';
}

export interface ReceiveMessagePlainPayload extends ReceiveMessagePayloadType {
  type: 'PLAIN';
  payload: {
    message: string;
  };
}

export type ReceiveMessagePayload<T extends ReceiveMessageMethodType> =
  T extends 'NATIVE_NAVIGATION'
    ? ReceiveMessageNativeNavigationPayload
    : T extends 'NATIVE_GO_BACK'
      ? ReceiveMessageNativeGoBackPayload
      : T extends 'AUTHORIZATION'
        ? ReceiveMessageAuthorizedPayload
        : T extends 'PLAIN'
          ? ReceiveMessagePlainPayload
          : never;

export type PostMessageMethodType =
  | 'INIT'
  | 'SAFE_AREA_INSETS'
  | 'WEB_NAVIGATION'
  | 'NATIVE_HISTORY';

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

export type PostMessagePayload<T extends PostMessageMethodType> =
  T extends 'SAFE_AREA_INSETS'
    ? PostMessageSafeAreaInsetsPayload
    : T extends 'INIT'
      ? PostMessageInitPayload
      : T extends 'WEB_NAVIGATION'
        ? PostMessageNavigationPayload
        : T extends 'NATIVE_HISTORY'
          ? PostMessageNativeHistoryPayload
          : never;
