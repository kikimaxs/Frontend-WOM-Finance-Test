import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
};

export default function ErrorState({ message = 'Terjadi kesalahan', onRetry, retryText = 'Coba Lagi' }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>{retryText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  message: { color: '#ff3b30', fontSize: 14, textAlign: 'center', marginBottom: 12 },
  button: { backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});