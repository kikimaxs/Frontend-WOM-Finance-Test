import { all, call, put, select, take, takeEvery, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import type { SagaIterator } from 'redux-saga';
import { clearAuth } from '@/src/stores/reducers/auth';
import { RootState } from '@/src/configs/store';
import { navigationRef } from 'react-navigation-helpers';
import { ROUTERS } from '@/src/routes';

function delay(ms: number) {
  return new Promise((res: any) => setTimeout(res, ms));
}

function* logTest(action: any): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('[Saga] SAGA_TEST received', action);
}

export default function* rootSagas(): SagaIterator {
  yield all([
    takeEvery('SAGA_TEST', logTest),
    takeEvery('persist/REHYDRATE', handleRehydrate),
    fork(watchAuthExpiry),
    takeEvery('auth/clearAuth', navigateToAuthOnLogout),
  ]);
}

function* handleRehydrate(): SagaIterator {
  // On rehydrate, check the expiry and logout if needed
  const auth: any = yield select((state: RootState) => (state as any).auth);
  const now = Date.now();
  
  if (auth && auth.expiresAt && auth.expiresAt <= now) {
    yield put(clearAuth());
  }
}

function* navigateToAuthOnLogout(): SagaIterator {
  try {
    const nav: any = navigationRef.current;
    if (nav) {
      nav.navigate(ROUTERS.AuthMain as any);
    }
  } catch (e) {}
}

function* watchAuthExpiry(): SagaIterator {
  while (true) {
    // Wait for auth changes
    yield take(['auth/setAuthData']);
    const auth: any = yield select((state: RootState) => (state as any).auth);
    if (!auth?.expiresAt) continue;
    const msRemaining = auth.expiresAt - Date.now();
    if (msRemaining <= 0) {
      yield put(clearAuth());
      continue;
    }
    // Schedule a logout at expiry
    yield call(delay, msRemaining);
    const latest: any = yield select((state: RootState) => (state as any).auth);
    if (latest?.expiresAt && latest.expiresAt <= Date.now()) {
      yield put(clearAuth());
    }
  }
}