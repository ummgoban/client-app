import React, {useRef, useState, useCallback} from 'react';
import {BackHandler, Linking} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

type Props = {
  uri: string;
  title?: string;
};

const WebViewScreen = ({uri}: Props) => {
  const webRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

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
    }, [canGoBack]),
  );

  return (
    <WebView
      ref={webRef}
      source={{uri}}
      onNavigationStateChange={s => setCanGoBack(s.canGoBack)}
      javaScriptEnabled
      domStorageEnabled
      setSupportMultipleWindows={false}
      // 필요 시 스킴 필터/외부 링크 분리
      onShouldStartLoadWithRequest={req => {
        if (!/^https?:/.test(req.url)) {
          Linking.openURL(req.url);
          return false;
        }
        return true;
      }}
    />
  );
};

export default WebViewScreen;
