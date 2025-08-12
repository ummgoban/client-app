import React from 'react';

import {WebViewScreen} from '@/webview/WebViewScreen';

type RouteWithWeb = {params: {webview?: {uri: string; title?: string}}};

const withWebViewGate = <P extends {route?: RouteWithWeb}>(
  NavigatorComponent: React.ComponentType<P>,
) => {
  return function WebViewGateComponent(props: P) {
    const webview = props.route?.params?.webview;

    if (webview?.uri) {
      return <WebViewScreen {...webview} />;
    }
    return <NavigatorComponent {...props} />;
  };
};

export default withWebViewGate;
