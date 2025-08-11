import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {BackHandler, Linking, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

import type {RootStackParamList} from '@/types/StackNavigationType';

import {useWebRefStore} from './useWebRef.store';
import {sendToWeb} from './utils';

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

const WebViewScreen = ({uri}: Props) => {
  const {webRef} = useWebRefStore();
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
      const msg: {type: string; payload: any} = JSON.parse(e.nativeEvent.data);
      switch (msg.type) {
        case 'NATIVE_NAVIGATION':
          navigation.navigate(msg.payload.screen, msg.payload.params);
          break;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendInit = () => {
    sendToWeb(webRef, {
      type: 'INIT',
      payload: {
        platform: Platform.OS,
        version: pkg.version,
        ts: Date.now(),
      },
    });
    sendToWeb(webRef, {
      type: 'SAFE_AREA_INSETS',
      payload: {
        top,
        left,
        right,
        bottom,
      },
    });
  };

  return (
    <WebView
      ref={webRef}
      source={{uri}}
      onNavigationStateChange={s => setCanGoBack(s.canGoBack)}
      javaScriptEnabled
      domStorageEnabled
      setSupportMultipleWindows={false}
      onMessage={onMessage}
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

export default WebViewScreen;
