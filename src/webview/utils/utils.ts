import type {
  ReceiveMessagePayload,
  ReceiveMessagePayloadType,
} from '../types/receive-message.type';

export const isNativeNavigationPayload = (
  msg: ReceiveMessagePayloadType,
): msg is ReceiveMessagePayload<'NATIVE_NAVIGATION'> =>
  msg.type === 'NATIVE_NAVIGATION';
export const isNativeGoBackPayload = (
  msg: ReceiveMessagePayloadType,
): msg is ReceiveMessagePayload<'NATIVE_GO_BACK'> =>
  msg.type === 'NATIVE_GO_BACK';
export const isPlainPayload = (
  msg: ReceiveMessagePayloadType,
): msg is ReceiveMessagePayload<'PLAIN'> => msg.type === 'PLAIN';
export const isUnknownPayload = (
  msg: ReceiveMessagePayloadType,
): msg is ReceiveMessagePayload<'UNKNOWN'> => msg.type === 'UNKNOWN';
