import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTERS } from '@/src/routes';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthData, clearAuth } from '@/src/stores/reducers/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { saveTokens, saveUser, clearTokens, clearUser } from '@/src/utils/secureStore';
import { RootState } from '@/src/configs/store';
import { getExpiryFromJWT } from '@/src/utils/jwt';
// Ikon Google diganti ke gambar dari assets

export default function AuthMainScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((state: RootState) => (state as any).auth);
  console.log('[Auth] isLoggedIn', isLoggedIn);
  console.log('[Auth] userData', userData);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('[Auth] starting Google signIn');
      const account = await GoogleSignin.signIn();
      console.log('[Auth] signIn completed');
      await saveTokens({
        accessToken: null,
        idToken: account.data?.idToken ?? null,
        serverAuthCode: account.data?.serverAuthCode ?? null,
      });
      await saveUser(account.data?.user);

      const chosenToken = account.data?.idToken ?? null;
      console.log('[Auth] token', chosenToken);
      // Prefer JWT exp if available, else fallback to 1 hour from now
      const jwtExpiry = getExpiryFromJWT(chosenToken);
      const expiresAt = jwtExpiry ?? Date.now() + 60 * 60 * 1000;

      dispatch(
        setAuthData({
          token: chosenToken,
          detail: account.data?.user,
          expiresAt,
        }),
      );
      // Alert sukses login
      Alert.alert('Login berhasil', `Selamat datang, ${account?.data?.user?.name ?? 'Pengguna'}`);
      // Navigate to Home after login
      navigation.navigate(ROUTERS.HomeAttendance as never);
    } catch (e: any) {
      console.warn('[Auth] Google login error', e?.message ?? e);
      // Extra diagnostics for Google Sign-In errors
      if (e) {
        console.warn('[Auth] error details', {
          code: e.code,
          status: e.status,
          description: e.description,
        });
      }
      // Alert error login
      Alert.alert('Login gagal', e?.message ?? 'Terjadi kesalahan saat login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Silakan login untuk melanjutkan.</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Image source={require('../../../../assets/images/icon-google.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Masuk dengan Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { marginTop: 8, fontSize: 14, color: '#666' },
  actions: { marginTop: 16, width: '80%' },
  googleButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  googleButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  googleIcon: { width: 30, height: 30 },
});