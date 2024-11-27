#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <RNKakaoLogins.h>
#import "RNCConfig.h"
#import <NaverThirdPartyLogin/NaverThirdPartyLogin.h> // Naver SDK 헤더 추가
#import <Firebase.h> // FirebaseCore 추가
#import "RNSplashScreen.h"

@implementation AppDelegate

// Kakao 및 Naver 로그인 관련 메서드
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
              NSString *naverUrlScheme = [RNCConfig envFor:@"NAVER_URL_SCHEME"];
  // Naver
  if ([url.scheme isEqualToString:naverUrlScheme]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }

  // Kakao
  if ([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl:url];
  }

  return NO;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure]; // Firebase 초기화 추가
  
  self.moduleName = @"ClientApp";
  // 초기 props 설정
  self.initialProps = @{};

  NSString *apiUrl = [RNCConfig envFor:@"API_URL"];

  NSDictionary *config = [RNCConfig env];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
