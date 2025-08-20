import React, {createRef, useCallback} from 'react';
import WebView from 'react-native-webview';
import {create} from 'zustand';
import type {
  AppToWebMethodType,
  AppToWebPayload,
} from '../types/app-to-web.type';

interface WebRefStore {
  webRef: React.RefObject<WebView>;
}

const webRefStore = create<WebRefStore>(() => ({
  webRef: createRef<WebView>(),
}));

export const useWebRefStore = () => {
  const webRef = webRefStore(state => state.webRef);

  const sendToWeb = useCallback(
    <T extends AppToWebMethodType>(payload: {
      type: T;
      payload: AppToWebPayload<T>['payload'];
    }) => {
      console.info('[App to Web] type:', payload.type);
      console.info('[App to Web] payload:', payload.payload);

      if (!webRef.current) {
        console.info('webRef.current is null');
        return;
      }

      webRef.current.injectJavaScript(`
      window.__fromRN && window.__fromRN(${JSON.stringify(payload)});
      true;
    `);
    },
    [webRef],
  );

  return {webRef, sendToWeb};
};
