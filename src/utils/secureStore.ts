import EncryptedStorage from 'react-native-encrypted-storage';

export const SECURE_KEYS = {
  tokens: 'authTokens',
  user: 'authUser',
};

export type AuthTokens = {
  accessToken?: string | null;
  idToken?: string | null;
  serverAuthCode?: string | null;
};

export async function saveTokens(tokens: AuthTokens) {
  try {
    await EncryptedStorage.setItem(SECURE_KEYS.tokens, JSON.stringify(tokens));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[SecureStore] Failed to save tokens', e);
  }
}

export async function getTokens(): Promise<AuthTokens | null> {
  try {
    const raw = await EncryptedStorage.getItem(SECURE_KEYS.tokens);
    return raw ? (JSON.parse(raw) as AuthTokens) : null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[SecureStore] Failed to read tokens', e);
    return null;
  }
}

export async function clearTokens() {
  try {
    await EncryptedStorage.removeItem(SECURE_KEYS.tokens);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[SecureStore] Failed to clear tokens', e);
  }
}

export async function saveUser(user: any) {
  try {
    await EncryptedStorage.setItem(SECURE_KEYS.user, JSON.stringify(user));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[SecureStore] Failed to save user', e);
  }
}

export async function getUser(): Promise<any | null> {
  try {
    const raw = await EncryptedStorage.getItem(SECURE_KEYS.user);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[SecureStore] Failed to read user', e);
    return null;
  }
}

export async function clearUser() {
  try {
    await EncryptedStorage.removeItem(SECURE_KEYS.user);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[SecureStore] Failed to clear user', e);
  }
}