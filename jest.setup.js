/* eslint-disable no-undef */

// 네이티브 모듈 모킹
jest.mock('react-native-splash-screen', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// 기타 필요한 네이티브 모듈 모킹
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// 네이티브 모듈을 사용하는 다른 패키지들도 필요에 따라 모킹
jest.mock('@react-native-firebase/messaging', () => ({
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('mockToken')),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
  })),
}));

jest.mock('@react-native-firebase/app', () => ({
  app: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  })),
}));

// 제스처 핸들러 모킹
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

// 기타 필요한 모킹
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({children}) => children,
  SafeAreaView: ({children}) => children,
  useSafeAreaInsets: () => ({top: 0, right: 0, bottom: 0, left: 0}),
}));

// 네비게이션 관련 모킹
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// TossPayment 모듈 모킹
jest.mock('@tosspayments/widget-sdk-react-native', () => ({
  PaymentWidgetProvider: ({children}) => children,
}));

// react-native-config 모킹
jest.mock('react-native-config', () => ({
  TOSS_CLIENT_KEY: 'test_client_key',
  TOSS_CUSTOMER_KEY: 'test_customer_key',
}));

// notifee 모듈 모킹
jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn(),
  displayNotification: jest.fn(),
}));

// async-storage 모킹
jest.mock('@react-native-async-storage/async-storage', () => ({
  AsyncStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
  },
}));

// encrypted-storage 모킹
jest.mock('react-native-encrypted-storage', () => ({
  RNEncryptedStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
  },
}));

// apple-authentication 모킹
jest.mock('@invertase/react-native-apple-authentication', () => ({
  appleAuth: {},
}));

// geolocation 모킹
jest.mock('react-native-geolocation-service', () => ({
  Geolocation: {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  },
}));

// permissions 모킹
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {},
  request: jest.fn(),
  RESULTS: {},
}));

// image-crop-picker 모킹
jest.mock('react-native-image-crop-picker', () => ({
  ImageCropPicker: {
    openPicker: jest.fn(),
    openCamera: jest.fn(),
  },
}));

// shared 모듈 모킹
jest.mock('@ummgoban/shared', () => ({
  combineProviders: jest.fn(
    providers =>
      ({children}) =>
        children,
  ),
}));

// gesture-handler 모킹
jest.mock('../gesture-handler', () => ({}), {virtual: true});
