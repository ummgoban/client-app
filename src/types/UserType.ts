import {SessionType} from './Session';

// TODO: Define UserType, 이미지 옵셔널로 변경 백엔드 미저장
export type UserType = {
  id: number | string;
  name: string;
  nickname: string;
  image?: string;
  provider: SessionType['OAuthProvider'];
  phoneNumber?: string;
  email?: string;
};
