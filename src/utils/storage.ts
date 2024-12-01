import EncryptedStorage from 'react-native-encrypted-storage';
import {StorageKeyType} from '@/types/Storage';

const FIRST_LAUNCH_KEY = 'isFirst';

export const setStorage = async <T extends Object>(
  key: StorageKeyType,
  value: T,
) => {
  await EncryptedStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = async <T extends Object>(
  key: StorageKeyType,
): Promise<T | null> => {
  const value = await EncryptedStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const checkFirstLaunch = async (): Promise<boolean> => {
  try {
    const isFirstLaunch = await EncryptedStorage.getItem(FIRST_LAUNCH_KEY);
    if (isFirstLaunch === null) {
      await EncryptedStorage.setItem(FIRST_LAUNCH_KEY, JSON.stringify(false));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking first launch:', error);
    return false;
  }
};
