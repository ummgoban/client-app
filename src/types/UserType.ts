import {SessionType} from './Session';

// TODO: Define UserType
export type UserType = {
  id: number | string;
  name: string;
  image: string;
  provider: SessionType['OAuthProvider'];
  phoneNumber?: string;
  email?: string;
};
