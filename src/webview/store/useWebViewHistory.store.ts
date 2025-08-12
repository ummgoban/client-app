import {create} from 'zustand';
import {ReceiveMessageNativeNavigationPayload} from '../types/receive-message.type';

interface WebViewHistoryStore {
  history: ReceiveMessageNativeNavigationPayload['payload']['callbackState'];
  setHistory: (
    history: ReceiveMessageNativeNavigationPayload['payload']['callbackState'],
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
