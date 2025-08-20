import {create} from 'zustand';
import {WebToAppNativeNavigationPayload} from '../types/web-to-app.type';

interface WebViewHistoryStore {
  history: WebToAppNativeNavigationPayload['payload']['callbackState'];
  setHistory: (
    history: WebToAppNativeNavigationPayload['payload']['callbackState'],
  ) => void;
}

const webviewHistoryStore = create<WebViewHistoryStore>(set => ({
  history: undefined,
  setHistory: history => set({history}),
}));

export const useWebViewHistoryStore = () => {
  const history = webviewHistoryStore(state => state.history);
  const setHistory = webviewHistoryStore(state => state.setHistory);

  return {history, setHistory};
};
