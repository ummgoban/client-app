import React from 'react';
import WebViewScreen from '@/webview/WebViewScreen';

type RouteWithWeb = {params: {webview?: {uri: string; title?: string}}};

const withWebViewGate = <P extends {route?: RouteWithWeb}>(
  NavigatorComponent: React.ComponentType<P>,
) => {
  return function WebViewGateComponent(props: P) {
    console.log(
      'withWebViewGate',
      JSON.stringify(props.route?.params, null, 2),
    );
    const webview = props.route?.params?.webview;
    console.log('webview', webview);
    if (webview?.uri) {
      return <WebViewScreen {...webview} />;
    }
    return <NavigatorComponent {...props} />;
  };
};

export default withWebViewGate;
