import { GOOGLE_WEB_CLIENT_ID as ENV_GOOGLE_WEB_CLIENT_ID } from '@env';

// Use env value if available; otherwise fallback to the known Web Client ID
export const GOOGLE_WEB_CLIENT_ID =
  ENV_GOOGLE_WEB_CLIENT_ID ||
  '431218500791-im2mke6q1dv0qjb1c4b8tghrsa01hmde.apps.googleusercontent.com';
export const GOOGLE_SIGNIN_OPTIONS = {
  offlineAccess: false,
  // forceCodeForRefreshToken: true,
  scopes: ['profile', 'email'],
};