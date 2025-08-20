import type {
  WebToAppMethodType,
  WebToAppPayload,
  WebToAppPayloadType,
} from '../types/web-to-app.type';

type IsWebToAppPayloadOf<T extends WebToAppMethodType> = (
  msg: WebToAppPayloadType,
) => msg is WebToAppPayload<T>;

export const isNativeNavigationPayload: IsWebToAppPayloadOf<
  'NATIVE_NAVIGATION'
> = (msg): msg is WebToAppPayload<'NATIVE_NAVIGATION'> =>
  msg.type === 'NATIVE_NAVIGATION';
export const isNativeGoBackPayload: IsWebToAppPayloadOf<'NATIVE_GO_BACK'> = (
  msg,
): msg is WebToAppPayload<'NATIVE_GO_BACK'> => msg.type === 'NATIVE_GO_BACK';
export const isPlainPayload: IsWebToAppPayloadOf<'PLAIN'> = (
  msg,
): msg is WebToAppPayload<'PLAIN'> => msg.type === 'PLAIN';
export const isUnknownPayload: IsWebToAppPayloadOf<'UNKNOWN'> = (
  msg,
): msg is WebToAppPayload<'UNKNOWN'> => msg.type === 'UNKNOWN';
