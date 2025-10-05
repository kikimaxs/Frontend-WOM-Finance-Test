import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTERS } from '@/src/routes';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '@/src/stores/reducers/auth';
import { clearTokens, clearUser } from '@/src/utils/secureStore';
import { RootState } from '@/src/configs/store';

export default function HomeAttendanceScreens() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => (state as any).auth);
  const handleLogout = async () => {
    await clearTokens();
    await clearUser();
    dispatch(clearAuth());
    navigation.navigate(ROUTERS.AuthMain as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Selamat datang{userData?.name ? `, ${userData.name}` : ''}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 24, fontWeight: 'bold' },
  logoutButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#eee', borderRadius: 6 },
  logoutText: { color: '#d00', fontWeight: '600' },
  subtitle: { marginTop: 8, fontSize: 14, color: '#666' },
  content: { marginTop: 16, fontSize: 16 },
  actions: { marginTop: 16, alignItems: 'center' },
});