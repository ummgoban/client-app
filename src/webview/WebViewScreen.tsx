import React, {useCallback, useState} from 'react';
import {BackHandler, Linking, Platform} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

import {useSession} from '@/apis/auth';
import type {RootStackParamList} from '@/types/StackNavigationType';

import {useWebRefStore, useWebViewHistoryStore} from './store';
import type {ReceiveMessagePayloadType} from './types/receive-message.type';
import {
  isNativeGoBackPayload,
  isNativeNavigationPayload,
  isPlainPayload,
  isUnknownPayload,
} from './utils';

import pkg from '../../package.json';

const injectedBefore = `
    (function() {
      // RN에서 보낸 데이터를 Web이 받을 함수
      // -> 커스텀 이벤트로 앱 전역에 전달
      window.__fromRN = function(data) {
        try {
          window.dispatchEvent(new CustomEvent('APP_MESSAGE', { detail: data }));
        } catch (e) {
          console.error('APP_MESSAGE error', e);
        }
      };
      // 리스너가 없을 때 도착하는 메시지 대비 큐도 가능(선택사항)
      window.__fromRNQueue = [];
      const orig = window.__fromRN;
      window.__fromRN = function(data) {
        if (window.__hasAppMessageListener) return orig(data);
        window.__fromRNQueue.push(data);
      };
      window.addEventListener('APP_MESSAGE_LISTENER_READY', function() {
        window.__hasAppMessageListener = true;
        while (window.__fromRNQueue.length) {
          orig(window.__fromRNQueue.shift());
        }
      });
    })();
    true;
  `;

type Props = {
  uri: string;
  title?: string;
};

export const WebViewScreen = ({uri}: Props) => {
  const {webRef, sendToWeb} = useWebRefStore();
  const {setHistory} = useWebViewHistoryStore();

  const {data: session} = useSession();

  const [canGoBack, setCanGoBack] = useState(false);
  const {top, left, right, bottom} = useSafeAreaInsets();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (canGoBack) {
          webRef.current?.goBack();
          return true;
        }
        return false;
      });
      return () => sub.remove();
    }, [canGoBack, webRef]),
  );

  const onMessage = (e: WebViewMessageEvent) => {
    try {
      console.info('Web to RN message', e.nativeEvent.data);
      const msg: ReceiveMessagePayloadType = JSON.parse(e.nativeEvent.data);

      if (isNativeNavigationPayload(msg)) {
        setHistory(msg.payload.callbackState);
        navigation.navigate(msg.payload.screen, msg.payload.params);
      } else if (isNativeGoBackPayload(msg)) {
        navigation.goBack();
      } else if (isPlainPayload(msg)) {
      } else if (isUnknownPayload(msg)) {
      }
    } catch (err) {
      console.error(`[WEBVIEW] ${err}`);
    }
  };

  const sendInit = () => {
    sendToWeb({
      type: 'INIT',
      payload: {
        platform: Platform.OS,
        version: pkg.version,
        ts: Date.now(),
      },
    });
    sendToWeb({
      type: 'SAFE_AREA_INSETS',
      payload: {
        top,
        left,
        right,
        bottom,
      },
    });
    sendToWeb({
      type: 'AUTHORIZATION',
      payload: {
        accessToken: session?.accessToken,
        refreshToken: session?.refreshToken,
      },
    });
  };

  return (
    <WebView
      ref={webRef}
      source={{
        uri,
      }}
      javaScriptEnabled
      domStorageEnabled
      setSupportMultipleWindows={false}
      bounces={false}
      onNavigationStateChange={s => setCanGoBack(s.canGoBack)}
      onMessage={onMessage}
      onError={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        console.error('WebView error: ', nativeEvent);
      }}
      onHttpError={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        console.error('WebView HTTP error: ', nativeEvent);
      }}
      // 필요 시 스킴 필터/외부 링크 분리
      onShouldStartLoadWithRequest={req => {
        if (!/^https?:/.test(req.url)) {
          Linking.openURL(req.url);
          return false;
        }
        return true;
      }}
      injectedJavaScriptBeforeContentLoaded={injectedBefore}
      onLoadEnd={sendInit}
    />
  );
};
