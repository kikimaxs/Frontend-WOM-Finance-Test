import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { Product } from '@/src/utils/productsApi';

type Props = {
  product: Product;
  onPress?: () => void;
  variant?: 'grid' | 'full';
  width?: number;
};

export default function ProductCard({ product, onPress, variant = 'grid', width }: Props) {
  const Container: any = onPress ? TouchableOpacity : View;
  const imageStyle = variant === 'grid' ? styles.thumbnailGrid : styles.thumbnailFull;
  return (
    <Container style={[styles.card, width ? { width } : null]} onPress={onPress} activeOpacity={0.8}>
      {product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={imageStyle} resizeMode="cover" />
      ) : (
        <View style={imageStyle} />
      )}
      <View style={styles.cardBody}>
        <Text numberOfLines={2} style={styles.cardTitle}>{product.title}</Text>
        {product.price != null ? <Text style={styles.cardPrice}>${product.price}</Text> : null}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, overflow: 'hidden', backgroundColor: '#fafafa' },
  thumbnailGrid: { width: '100%', height: 160, backgroundColor: '#eaeaea' },
  thumbnailFull: { width: '100%', height: 240, backgroundColor: '#eaeaea' },
  cardBody: { padding: 10 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 6 },
  cardPrice: { fontSize: 13, fontWeight: '700', color: '#007AFF' },
});