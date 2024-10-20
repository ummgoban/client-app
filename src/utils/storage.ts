import EncryptedStorage from 'react-native-encrypted-storage';

import {StorageKeyType} from '@/types/Storage';

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
