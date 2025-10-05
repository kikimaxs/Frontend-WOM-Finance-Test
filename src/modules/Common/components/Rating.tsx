import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  rating: number; // nilai 0-5 (integer)
  max?: number; // default 5
  size?: number; // ukuran ikon
  filledColor?: string; // warna bintang terisi
  emptyColor?: string; // warna bintang kosong
  spacing?: number; // jarak antar bintang
  style?: ViewStyle; // style container
};

export default function Rating({
  rating,
  max = 5,
  size = 20,
  filledColor = '#FFD700', // gold/yellow
  emptyColor = '#C7C7CC', // iOS system gray-ish
  spacing = 4,
  style,
}: Props) {
  const filledCount = Math.max(0, Math.min(max, Math.floor(rating)));
  const stars = Array.from({ length: max }, (_, i) => i < filledCount);

  return (
    <View style={[styles.row, style]}>
      {stars.map((isFilled, idx) => (
        <MaterialCommunityIcons
          key={idx}
          name={isFilled ? 'star' : 'star-outline'}
          size={size}
          color={isFilled ? filledColor : emptyColor}
          style={{ marginRight: idx !== max - 1 ? spacing : 0 }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
});