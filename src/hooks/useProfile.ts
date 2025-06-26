import {MutateOptions, useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';

import {
  useLoginQuery,
  useLoginWithOAuthQuery,
  useLogoutQuery,
  useProfileQuery,
  useSendEmailCodeMutation,
  useSignUpQuery,
  useVerifyEmailCodeMutation,
  useWithdrawMutation,
} from '@/apis/auth/query';

import type {
  LoginRequest,
  OAuthLoginRequest,
  SignUpRequest,
} from '@/apis/auth/model';

import CustomError from '@/apis/CustomError';

const useProfile = () => {
  const {data: profileData, error: profileError} = useProfileQuery();

  const {mutate: mutateLogout, isPending: logoutPending} = useLogoutQuery();
  const {mutate: mutateLogin, isPending: loginPending} = useLoginQuery();
  const {mutateAsync: mutateLoginWithOAuth, isPending: oAuthPending} =
    useLoginWithOAuthQuery();
  const {mutate: mutateSignUp, isPending: signUpPending} = useSignUpQuery();
  const {mutate: mutateSendEmailCode, isPending: isPendingSendEmailCode} =
    useSendEmailCodeMutation();
  const {mutate: mutateVerifyEmailCode, isPending: isPendingVerifyEmailCode} =
    useVerifyEmailCodeMutation();
  const {mutate: mutateWithdraw, isPending: isPendingWithdraw} =
    useWithdrawMutation();

  const loading =
    logoutPending || loginPending || oAuthPending || signUpPending;

  const queryClient = useQueryClient();

  const refreshProfile = useCallback(async () => {
    await queryClient.invalidateQueries({queryKey: ['profile']});
  }, [queryClient]);

  const logout = useCallback(
    ({
      onSuccess,
      onError,
      ...rest
    }: {
      onSuccess?: () => void;
      onError?: (error: CustomError) => void;
    } & MutateOptions<boolean, CustomError, void, unknown>) => {
      mutateLogout(undefined, {
        onSuccess: async () => {
          await refreshProfile();
          if (onSuccess) {
            onSuccess();
          }
        },
        onError: async error => {
          if (error instanceof CustomError) {
            await refreshProfile();
            if (onError) {
              onError(error);
            }
          }
        },
        ...rest,
      });
    },
    [mutateLogout, refreshProfile],
  );

  const signUp = useCallback(
    (
      variables: SignUpRequest,
      options?: MutateOptions<boolean, CustomError, SignUpRequest, unknown>,
    ) => {
      mutateSignUp(variables, {
        onSuccess: async (_data, _variables, _context) => {
          await refreshProfile();
          if (options?.onSuccess) {
            options.onSuccess(_data, _variables, _context);
          }
        },
        onError: (error, _variables, _context) => {
          if (error instanceof CustomError) {
            if (options?.onError) {
              options.onError(error, _variables, _context);
            }
          }
        },
        ...options?.onSettled,
      });
    },
    [mutateSignUp, refreshProfile],
  );

  const login = useCallback(
    (
      variables: LoginRequest,
      options?: MutateOptions<boolean, CustomError, void, unknown>,
    ) => {
      mutateLogin(variables, {
        onSuccess: async (_data, _variables, _context) => {
          await refreshProfile();
          if (options?.onSuccess) {
            options.onSuccess(_data, undefined, _context);
          }
        },
        onError: (error, _variables, _context) => {
          if (error instanceof CustomError) {
            if (options?.onError) {
              options?.onError(error, undefined, _context);
            }
          }
        },
      });
    },
    [mutateLogin, refreshProfile],
  );

  const loginWithOAuth = useCallback(
    async (oAuthProvider: OAuthLoginRequest) => {
      const res = await mutateLoginWithOAuth(oAuthProvider);
      if (res) {
        await refreshProfile();
        return true;
      }

      console.log('loginWithOAuth failed');

      return false;
    },
    [mutateLoginWithOAuth, refreshProfile],
  );

  const withdraw = useCallback(
    (options?: MutateOptions<boolean, CustomError, void, unknown>) => {
      mutateWithdraw(undefined, {
        onSuccess: async (_data, _variables, _context) => {
          await refreshProfile();
          if (options?.onSuccess) {
            options.onSuccess(_data, undefined, _context);
          }
        },
        onError: (error, _variables, _context) => {
          if (error instanceof CustomError) {
            if (options?.onError) {
              options.onError(error, undefined, _context);
            }
          }
        },
        ...options?.onSettled,
      });
    },
    [mutateWithdraw, refreshProfile],
  );

  return {
    profile: profileError ? null : profileData,
    refreshProfile,
    signUp,
    loading,
    login,
    loginWithOAuth,
    logout,
    sendEmailCode: mutateSendEmailCode,
    verifyEmailCode: mutateVerifyEmailCode,
    isPendingSendEmailCode,
    isPendingVerifyEmailCode,
    withdraw,
    isPendingWithdraw,
  };
};

export default useProfile;
