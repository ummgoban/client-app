import {MutateOptions, useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {create} from 'zustand';

import {UserType} from '@/types/UserType';

import {
  useLoginQuery,
  useLoginWithOAuthQuery,
  useLogoutQuery,
  useProfileQuery,
  useSignUpQuery,
} from '@/apis/auth/query';

import type {
  LoginRequest,
  OAuthLoginRequest,
  SignUpRequest,
} from '@/apis/auth/model';

import CustomError from '@/apis/CustomError';

type AdminUserType = UserType & {
  marketId: number | null;
};

type ProfileStore = {
  profile: AdminUserType | null;
  setCurrentMarketId: (marketId: number) => void;
};

const useProfileStore = create<ProfileStore>(set => ({
  profile: null,
  setCurrentMarketId: marketId => {
    set(state => {
      if (!state.profile) {
        return state;
      }
      return {profile: {...state.profile, marketId}};
    });
  },
}));

const useProfile = () => {
  const {setCurrentMarketId} = useProfileStore();

  const {data: profile} = useProfileQuery();

  const {mutate: mutateLogout, isPending: logoutPending} = useLogoutQuery();
  const {mutate: mutateLogin, isPending: loginPending} = useLoginQuery();
  const {mutateAsync: mutateLoginWithOAuth, isPending: oAuthPending} =
    useLoginWithOAuthQuery();
  const {mutateAsync: mutateSignUp, isPending: signUpPending} =
    useSignUpQuery();

  const loading =
    logoutPending || loginPending || oAuthPending || signUpPending;

  const queryClient = useQueryClient();

  const refreshProfile = useCallback(async () => {
    await queryClient.invalidateQueries({queryKey: ['profile']});
  }, [queryClient]);

  const selectMarket = useCallback(
    (marketId: number) => {
      setCurrentMarketId(marketId);
    },
    [setCurrentMarketId],
  );

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
        onError: error => {
          if (error instanceof CustomError) {
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
    async ({email, password, name, phoneNumber}: SignUpRequest) => {
      const res = await mutateSignUp({email, password, name, phoneNumber});
      if (res) {
        await refreshProfile();
        return true;
      }

      return false;
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

  return {
    profile,
    refreshProfile,
    selectMarket,
    signUp,
    loading,
    login,
    loginWithOAuth,
    logout,
  };
};

export default useProfile;
