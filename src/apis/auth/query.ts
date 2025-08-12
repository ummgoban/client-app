import {useMutation, useQuery} from '@tanstack/react-query';

import {
  credentialLogin,
  credentialSignUp,
  getProfile,
  loginWithOAuth,
  logout,
  patchNickname,
  registerFCMToken,
  sendEmailCode,
  verifyEmailCode,
  withdraw,
} from './client';

import {
  LoginRequest,
  OAuthLoginRequest,
  SignUpRequest,
  SendEmailCodeRequest,
  VerifyEmailCodeRequest,
} from './model';

import CustomError from '../CustomError';
import {getStorage} from '@/utils/storage';
import {SessionType} from '@ummgoban/shared';

export const useSession = () =>
  useQuery({
    queryKey: ['session'],
    queryFn: async (): Promise<SessionType | null> =>
      await getStorage('session'),
  });

export const useProfileQuery = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: false,
  });

export const useLoginQuery = () =>
  useMutation({
    mutationKey: ['credentail-login'],
    mutationFn: ({email, password}: LoginRequest) =>
      credentialLogin({email, password}),
  });

export const useSignUpQuery = () =>
  useMutation({
    mutationKey: ['credentail-sign-up'],
    mutationFn: ({email, password, name, phoneNumber}: SignUpRequest) =>
      credentialSignUp({email, password, name, phoneNumber}),
  });

export const useLoginWithOAuthQuery = () =>
  useMutation({
    mutationKey: ['oauth-login'],
    mutationFn: (oAuthProvider: OAuthLoginRequest) =>
      loginWithOAuth(oAuthProvider),
  });

export const useLogoutQuery = () =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
  });

export const useRegisterFCMTokenQuery = () =>
  useMutation({
    mutationKey: ['register-fcm-token'],
    mutationFn: (deviceToken: string) => registerFCMToken(deviceToken),
  });

export const useSendEmailCodeMutation = () =>
  useMutation<boolean, CustomError, SendEmailCodeRequest, unknown>({
    mutationKey: ['send-email-code'],
    mutationFn: ({email}: SendEmailCodeRequest) => sendEmailCode({email}),
  });

export const useVerifyEmailCodeMutation = () =>
  useMutation({
    mutationKey: ['verify-email-code'],
    mutationFn: ({email, code}: VerifyEmailCodeRequest) =>
      verifyEmailCode({email, code}),
  });

export const useWithdrawMutation = () =>
  useMutation({
    mutationKey: ['withdraw'],
    mutationFn: () => withdraw(),
  });

export const usePatchNicknameMutation = () => {
  return useMutation({
    mutationKey: ['patchNickname'],
    mutationFn: (nickName: string) => patchNickname(nickName),
  });
};
