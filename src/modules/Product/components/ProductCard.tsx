import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { Product } from '@/src/utils/productsApi';
import Rating from '@/src/modules/Common/components/Rating';

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
    <View style={[styles.shadowWrap, width ? { width } : null]}>
      <Container style={styles.card} onPress={onPress} activeOpacity={0.8}>
        {product.thumbnail ? (
          <Image source={{ uri: product.thumbnail }} style={imageStyle} resizeMode="cover" />
        ) : (
          <View style={imageStyle} />
        )}
        <View style={styles.cardBody}>
          <Text numberOfLines={2} style={styles.cardTitle}>{product.title}</Text>
          {product.price != null ? <Text style={styles.cardPrice}>${product.price}</Text> : null}
          {typeof product.rating === 'number' ? (
            <View style={styles.ratingRow}>
              <Rating rating={Math.floor(product.rating)} size={14} spacing={2} />
              <Text style={styles.ratingText}>{product.rating.toFixed ? product.rating.toFixed(1) : product.rating}</Text>
            </View>
          ) : null}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: 12,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Android elevation
    elevation: 3,
    backgroundColor: 'transparent',
  },
  card: { borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff' },
  thumbnailGrid: { width: '100%', height: 160, backgroundColor: '#eaeaea' },
  thumbnailFull: { width: '100%', height: 240, backgroundColor: '#eaeaea' },
  cardBody: { padding: 10 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 6 },
  cardPrice: { fontSize: 13, fontWeight: '700', color: '#007AFF' },
  ratingRow: { marginTop: 6, flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 6, fontSize: 12, color: '#666' },
});