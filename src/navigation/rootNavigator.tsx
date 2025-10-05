import { store } from '@/src/configs/store';
import React from 'react';
import { Platform } from 'react-native';
import { Navigator, ROUTERS, Screen } from '../routes';
import HomeAttendanceScreens from '@/src/modules/Home/screens';
import AuthMainScreen from '@/src/modules/Auth/screens';
import { getExpiryFromJWT } from '@/src/utils/jwt';

// New Architecture: setLayoutAnimationEnabledExperimental is a no-op; remove to avoid warnings

function RootNavigator() {
  const state = store.getState();
  const auth = (state as any).auth;
  const token = auth?.token;
  const expiresAt = auth?.expiresAt ?? getExpiryFromJWT(token);
  const isValid = token && (!expiresAt || expiresAt > Date.now());

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        autoHideHomeIndicator: true,
      }}
      initialRouteName={isValid ? ROUTERS.HomeAttendance : ROUTERS.AuthMain}
    >
      {/* start region screen App */}
         <Screen name={ROUTERS.HomeAttendance} component={HomeAttendanceScreens} />
         <Screen name={ROUTERS.AuthMain} component={AuthMainScreen} />
      {/* end region screen App */}
    </Navigator>
  );
}

export default React.memo(RootNavigator);
