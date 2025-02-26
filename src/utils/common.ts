import {SessionType} from '@/types/Session';

export function convertOAuthProviderToKorean(
  provider: SessionType['OAuthProvider'],
) {
  switch (provider) {
    case 'KAKAO':
      return '카카오';
    case 'NAVER':
      return '네이버';
    case 'APPLE':
      return '애플';
    default:
      return '';
  }
}
