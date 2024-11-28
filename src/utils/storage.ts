import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const isFirstLaunch = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
    if (isFirstLaunch === null) {
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'false');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error check first launch:', error);
    return false;
  }
};
