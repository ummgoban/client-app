import apiClient from './ApiClient';

export const registerFCMToken = async (
  deviceToken: string,
): Promise<boolean> => {
  try {
    console.log('Registering FCM token:', deviceToken);
    const res = await apiClient.post<{code: number; message: string}>(
      '/members/device-token',
      {},
      {
        params: {
          deviceToken,
        },
      },
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
