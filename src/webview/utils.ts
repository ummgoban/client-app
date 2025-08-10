import WebView from 'react-native-webview';

export const sendToWeb = (
  webRef: React.RefObject<WebView<{}>>,
  payload: {type: string; payload: any},
) => {
  webRef.current?.injectJavaScript(`
    window.__fromRN && window.__fromRN(${JSON.stringify(payload)});
    true;
  `);
};
