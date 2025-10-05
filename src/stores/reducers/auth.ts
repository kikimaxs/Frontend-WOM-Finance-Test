import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  userData: any | null;
  expiresAt: number | null;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  userData: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.detail;
      state.isLoggedIn = true;
      state.expiresAt = action.payload.expiresAt ?? null;
    },
    clearAuth: (state) => {
      state.token = null;
      state.userData = null;
      state.isLoggedIn = false;
      state.expiresAt = null;
    },
  },
});

export const { setAuthData, clearAuth } = authSlice.actions;
export const reducer = authSlice.reducer;