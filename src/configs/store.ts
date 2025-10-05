import * as middleware from '@/src/middleware/index';
import rootReducers from '@/src/stores/reducers';
import rootSagas from '@/src/stores/sagas';
import { configureStore } from '@reduxjs/toolkit';
import { createNetworkMiddleware } from 'react-native-offline';
import { persistStore, Persistor } from 'redux-persist';
import { injectStore } from '@/src/utils/httpclient';

let createSagaMiddlewareFn: any = undefined;
try {
  // Prefer @redux-saga/core
  const core = require('@redux-saga/core');
  console.log('[Store] Loaded @redux-saga/core export keys:', Object.keys(core || {}));
  createSagaMiddlewareFn =
    core?.default?.default ??
    core?.default ??
    core?.createSagaMiddleware ??
    core;
  if (typeof createSagaMiddlewareFn !== 'function') {
    console.warn('[Store] @redux-saga/core did not provide a function export for createSagaMiddleware');
  } else {
    console.log('[Store] Using createSagaMiddleware from @redux-saga/core');
  }
} catch (e) {}
if (!createSagaMiddlewareFn) {
  try {
    // Fallback to redux-saga proxy
    const sagaPkg = require('redux-saga');
    console.log('[Store] Loaded redux-saga export keys:', Object.keys(sagaPkg || {}));
    createSagaMiddlewareFn =
      sagaPkg?.default?.default ??
      sagaPkg?.default ??
      sagaPkg?.createSagaMiddleware ??
      sagaPkg;
    if (typeof createSagaMiddlewareFn !== 'function') {
      console.warn('[Store] redux-saga did not provide a function export for createSagaMiddleware');
    } else {
      console.log('[Store] Using createSagaMiddleware from redux-saga');
    }
  } catch (e) {}
}
if (typeof createSagaMiddlewareFn !== 'function') {
  throw new Error('createSagaMiddleware is not a function from saga packages');
}
export const sagaMiddleware = createSagaMiddlewareFn();

const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    });
    middlewares.push(sagaMiddleware);
    middlewares.push(networkMiddleware as any);
    middlewares.push(middleware.MiddlewarePerfMonitor);
    return middlewares;
  },
//   devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor: Persistor = persistStore(store);

// Provide the store to HttpClient for auth and navigation side-effects
injectStore(store);

sagaMiddleware.run(rootSagas);
