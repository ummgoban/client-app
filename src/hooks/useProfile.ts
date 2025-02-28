import {useQueryClient} from '@tanstack/react-query';
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
  SignUpRequest,
  OAuthLoginRequest,
} from '@/apis/auth/model';

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

  const {mutateAsync: mutateLogout, isPending: logoutPending} =
    useLogoutQuery();
  const {mutateAsync: mutateLogin, isPending: loginPending} = useLoginQuery();
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

  const logout = useCallback(async () => {
    const res = await mutateLogout();
    if (res) {
      await refreshProfile();
      return true;
    }

    return false;
  }, [mutateLogout, refreshProfile]);

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
    async ({email, password}: LoginRequest) => {
      const result = await mutateLogin({email, password});
      if (result) {
        await refreshProfile();
        return true;
      }

      return false;
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
