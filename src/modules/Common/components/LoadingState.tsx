import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

type Props = {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
};

export default function LoadingState({ message, size = 'large', color = '#007AFF' }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  message: { marginTop: 12, color: '#444', fontSize: 14, textAlign: 'center' },
});