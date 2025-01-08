import {useCallback} from 'react';
import {create} from 'zustand';

import {
  getProfile as getProfileApi,
  login as loginApi,
  logout as logoutApi,
} from '@/apis/Login';

import {SessionType} from '@/types/Session';
import {UserType} from '@/types/UserType';

import messaging from '@react-native-firebase/messaging';
import {registerFCMToken} from '@/apis/Fcm';

type AdminUserType = UserType & {
  marketId: number | null;
};

type ProfileStore = {
  loading: boolean;
  profile: AdminUserType | null;
  getProfile: () => Promise<void>;
  setCurrentMarketId: (marketId: number) => void;
};

const useProfileStore = create<ProfileStore>(set => ({
  loading: true,
  profile: null,
  getProfile: async () => {
    set({loading: true});
    const profileRes = await getProfileApi();

    if (!profileRes) {
      set({profile: null, loading: false});
      return;
    }
    set({profile: {...profileRes, marketId: null}, loading: false});
  },
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
  const {profile, getProfile, setCurrentMarketId, loading} = useProfileStore();

  const fetchProfile = useCallback(async () => {
    if (!profile) {
      await getProfile();
    }
  }, [getProfile, profile]);

  const refresh = useCallback(async () => {
    await getProfile();
    const token = await messaging().getToken();
    await registerFCMToken(token);
    console.log('FCM Token:', token);
  }, [getProfile]);

  const selectMarket = useCallback(
    (marketId: number) => {
      setCurrentMarketId(marketId);
    },
    [setCurrentMarketId],
  );

  const logout = useCallback(async () => {
    const res = await logoutApi();
    if (res) {
      await refresh();
      return true;
    }

    return false;
  }, [refresh]);

  const login = useCallback(
    async (oAuthProvider: SessionType['OAuthProvider']) => {
      const res = await loginApi(oAuthProvider);
      if (res) {
        await refresh();

        return true;
      }

      return false;
    },
    [refresh],
  );

  return {
    profile,
    refresh,
    fetch: fetchProfile,
    selectMarket,
    loading,
    logout,
    login,
  };
};

export default useProfile;
