import {SessionType} from '@/types/Session';

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
};

export type OAuthLoginRequest = SessionType['OAuthProvider'];

export type SendEmailCodeRequest = {email: string};

export type VerifyEmailCodeRequest = {email: string; code: string};
