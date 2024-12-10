export type SessionType = {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpiresAt?: number;
  refreshTokenExpiresAt?: number;
  OAuthProvider: 'NAVER' | 'KAKAO' | 'APPLE';
  jwt: string;
};
