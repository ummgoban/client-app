import React from 'react';
import WebView from 'react-native-webview';
import {create} from 'zustand';

interface WebRefStore {
  webRef: React.RefObject<WebView>;
  setWebRef: (webRef: React.RefObject<WebView> | undefined) => void;
}

const webRefStore = create<WebRefStore>(set => ({
  webRef: React.createRef<WebView>(),
  setWebRef: webRef => set({webRef}),
}));

export const useWebRefStore = () => {
  const webRef = webRefStore(state => state.webRef);
  const setWebRef = webRefStore(state => state.setWebRef);

  return {webRef, setWebRef};
};
