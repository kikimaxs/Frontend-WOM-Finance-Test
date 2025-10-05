import { persistor, store } from '@/src/configs/store';
import NavigationContainer from '@/src/navigation/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NetworkProvider } from 'react-native-offline';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootNavigator from '@/src/navigation/rootNavigator';
import React, { useEffect } from 'react';
import app from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_SIGNIN_OPTIONS } from '@/src/configs/auth';
import { PersistGate } from 'redux-persist/integration/react';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        if (failureCount > 6 && error?.message === 'Network Error') {
          // Retry mutations if the error is due to network issues
          return false;
        }
        if (error?.message !== 'Network Error') {
          return failureCount === 2;
        }
        return true;
      },
    },
  },
});

 export default function App() {
  useEffect(() => {
    // Log status inisialisasi Firebase App
    try {
      const firebaseApp = app;
        console.log('[Firebase] App name:', (firebaseApp as any).name);
      // Opsi bisa berisi projectId, appId, dll.
      console.log('[Firebase] App options:', (firebaseApp as any).options);
    } catch (e) {
      console.log('[Firebase] Error init app:', e);
    }

    // Nyalakan Analytics dan kirim event uji
    (async () => {
      try {
        await analytics().setAnalyticsCollectionEnabled(true);
        await analytics().logAppOpen();
        await analytics().logEvent('test_event', { ts: Date.now() });
        console.log('[Firebase] Analytics event logged');
      } catch (e) {
        console.log('[Firebase] Error analytics:', e);
      }
    })();
  }, []);

  useEffect(() => {
    // Konfigurasi Google Sign-In
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      ...GOOGLE_SIGNIN_OPTIONS,
    });
    console.log('[GoogleSignin] configured with webClientId:', GOOGLE_WEB_CLIENT_ID);
  }, []);
  return (
    <Provider store={store}>
      <NetworkProvider
        pingTimeout={5000}
        pingServerUrl="https://www.google.com"
        shouldPing={true}
        pingInterval={30000}
        pingOnlyIfOffline={false}
        pingInBackground={false}
        httpMethod="HEAD"
        customHeaders={{}}
      >
        <SafeAreaProvider>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </QueryClientProvider>
          </PersistGate>
        </SafeAreaProvider>
      </NetworkProvider>
    </Provider>
  );
}

