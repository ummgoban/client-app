# fastlane documentation

> ⚡️ iOS & Android 자동화 배포를 위한 Fastlane 설정 문서입니다.

---

## 🔧 Installation

1. **Xcode Command Line Tools 설치**
```sh
xcode-select --install
```

2. **fastlane 설치**
```sh
[sudo] brew install bundler
# 또는 Bundler 사용하는 경우:
bundle install
```

자세한 설치 가이드는 [fastlane.tools 설치 가이드](https://docs.fastlane.tools/#installing-fastlane)를 참고하세요.

---

## 🚀 Available Fastlane Lanes

### 📱 iOS

#### `ios develop`

```sh
[bundle exec] fastlane ios develop
```

✅ 개발 서버용 `.env.development` 설정  
✅ build number 증가  
✅ TestFlight 업로드

---

#### `ios release`

```sh
[bundle exec] fastlane ios release
```

🚀 프로덕션 서버용 `.env.release` 설정  
🚀 build number 증가  
🚀 App Store 업로드

---

### 🤖 Android

#### `android dev`

```sh
[bundle exec] fastlane android dev
```

✅ 개발 서버용 `.env.development` 설정  
✅ Debug 빌드 (`installDebug`) 후 기기에 설치

---

#### `android release`

```sh
[bundle exec] fastlane android release
```

🚀 프로덕션 서버용 `.env.release` 설정  
🚀 AAB 빌드 (`bundleRelease`)  
🚀 Play Store 내부 테스트 트랙 업로드  
※ `android/service-account.json` 필요

---

## 📁 환경 변수 파일 (.env)

- `.env.development` – 개발용 설정
- `.env.release` – 릴리즈용 설정
- 환경 변수는 `react-native-config`로 Android/iOS에 자동 주입됩니다.

---

## 🔐 인증 관련

### iOS
- `fastlane/AuthKey_XXXX.p8`  
- `key_id`, `issuer_id`는 `Fastfile`에 설정되어 있음

### Android
- `android/service-account.json`  
- 권한: Google Play Console > API Access > 서비스 계정 등록 필수

---

## 📚 더 보기

- [Fastlane 공식 문서](https://docs.fastlane.tools)
- [iOS 배포 가이드](https://docs.fastlane.tools/getting-started/ios/setup/)
- [Android 배포 가이드](https://docs.fastlane.tools/getting-started/android/setup/)

---

_이 README는 Fastlane 실행 시 자동으로 덮어쓰기되지 않으며, 수동 관리 중입니다._
