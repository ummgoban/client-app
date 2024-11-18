export type SessionType = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
  OAuthProvider: 'NAVER' | 'KAKAO';
  jwt: string;
};
