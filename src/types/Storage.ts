import {SessionType} from './Session';

export type StorageType = {
  session: SessionType;
};

export type StorageKeyType = keyof StorageType;
