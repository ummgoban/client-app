import {useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {create} from 'zustand';

import {UserType} from '@/types/UserType';

import {useLogoutQuery, useProfileQuery} from '@/apis/auth';

type AdminUserType = UserType & {
  marketId: number | null;
};

type ProfileStore = {
  loading: boolean;
  profile: AdminUserType | null;
  setCurrentMarketId: (marketId: number) => void;
};

const useProfileStore = create<ProfileStore>(set => ({
  loading: true,
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
  const {setCurrentMarketId, loading} = useProfileStore();

  const {data: profile} = useProfileQuery();
  const {mutate: mutateLogout, isSuccess: isLogoutSuccess} = useLogoutQuery();

  const queryClient = useQueryClient();

  const refreshProfile = useCallback(async () => {
    if (!profile) {
      await queryClient.invalidateQueries({queryKey: ['profile']});
    }
  }, [queryClient, profile]);

  const selectMarket = useCallback(
    (marketId: number) => {
      setCurrentMarketId(marketId);
    },
    [setCurrentMarketId],
  );

  const logout = useCallback(async () => {
    mutateLogout();
    if (isLogoutSuccess) {
      await refreshProfile();
      return true;
    }

    return false;
  }, [isLogoutSuccess, mutateLogout, refreshProfile]);

  return {
    profile,
    refreshProfile,
    selectMarket,
    loading,
    logout,
  };
};

export default useProfile;
