import { combineReducers } from '@reduxjs/toolkit';
import { reducer as network } from 'react-native-offline';
import { reducer as auth } from './auth';
import { persistReducer } from 'redux-persist';
import { encryptedStorage } from '@/src/configs/persist';

const authPersistConfig = {
  key: 'auth',
  storage: encryptedStorage,
  whitelist: ['token', 'isLoggedIn', 'userData', 'expiresAt'],
};

const rootReducers = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  network,
});

export default rootReducers;