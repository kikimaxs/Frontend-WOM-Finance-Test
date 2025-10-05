import EncryptedStorage from 'react-native-encrypted-storage';
import type { Storage } from 'redux-persist';

// Storage adapter using EncryptedStorage for redux-persist
export const encryptedStorage: Storage = {
  setItem: (key: string, value: string) => EncryptedStorage.setItem(key, value),
  getItem: (key: string) => EncryptedStorage.getItem(key),
  removeItem: (key: string) => EncryptedStorage.removeItem(key),
};

export const PERSIST_KEY = 'root';