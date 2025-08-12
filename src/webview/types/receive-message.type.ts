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
