import React from 'react';
import WebView from 'react-native-webview';
import {create} from 'zustand';
import {PostMessageMethodType} from '../types/post-message.type';

interface WebRefStore {
  webRef: React.RefObject<WebView>;
}

const webRefStore = create<WebRefStore>(() => ({
  webRef: React.createRef<WebView>(),
}));

export const useWebRefStore = () => {
  const webRef = webRefStore(state => state.webRef);

  const sendToWeb = (payload: {type: PostMessageMethodType; payload: any}) => {
    webRef.current?.injectJavaScript(`
      window.__fromRN && window.__fromRN(${JSON.stringify(payload)});
      true;
    `);
  };

  return {webRef, sendToWeb};
};
