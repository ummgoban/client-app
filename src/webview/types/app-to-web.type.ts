export type AppToWebMethodType =
  | 'INIT'
  | 'SAFE_AREA_INSETS'
  | 'WEB_NAVIGATION'
  | 'NATIVE_HISTORY'
  | 'AUTHORIZATION';

export interface AppToWebPayloadType {
  type: AppToWebMethodType;
  payload?: object;
}

export interface AppToWebSafeAreaInsetsPayload extends AppToWebPayloadType {
  type: 'SAFE_AREA_INSETS';
  payload: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface AppToWebInitPayload extends AppToWebPayloadType {
  type: 'INIT';
  payload: {
    /**
     * platform
     */
    platform: 'ios' | 'android' | 'windows' | 'macos' | 'web';
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

export interface AppToWebNavigationPayload extends AppToWebPayloadType {
  type: 'WEB_NAVIGATION';
  payload: {
    screen: string;
    params?: object;
  };
}

export interface AppToWebNativeHistoryPayload extends AppToWebPayloadType {
  type: 'NATIVE_HISTORY';
  payload: {
    screen: string;
    params?: object;
  };
}

export interface AppToWebAuthorizationPayload extends AppToWebPayloadType {
  type: 'AUTHORIZATION';
  payload: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export type AppToWebPayload<T extends AppToWebMethodType> =
  T extends 'SAFE_AREA_INSETS'
    ? AppToWebSafeAreaInsetsPayload
    : T extends 'INIT'
      ? AppToWebInitPayload
      : T extends 'WEB_NAVIGATION'
        ? AppToWebNavigationPayload
        : T extends 'NATIVE_HISTORY'
          ? AppToWebNativeHistoryPayload
          : T extends 'AUTHORIZATION'
            ? AppToWebAuthorizationPayload
            : never;
