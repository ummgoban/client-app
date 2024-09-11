export type LoginPlatformProps = {
  platform: 'kakao' | 'naver' | 'apple';
};

export type LoginRequestType = {
  providerType: 'KAKAO' | 'NAVER';
  rolesType: string;
  state?: string; // 네이버 로그인의 경우 선택적 필드
  token: string; // 필수 필드
};
