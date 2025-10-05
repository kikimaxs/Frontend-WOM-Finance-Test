import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ROUTERS, RootStackNavigationTypes } from '@/src/routes';
import { fetchProductDetail, Product } from '@/src/utils/productsApi';
import ProductCard from '@/src/modules/Product/components/ProductCard';
import LoadingState from '@/src/modules/Common/components/LoadingState';
import ErrorState from '@/src/modules/Common/components/ErrorState';
import Rating from '@/src/modules/Common/components/Rating';
import HeaderBar from '@/src/modules/Common/components/HeaderBar';

type ProductDetailsRoute = RouteProp<RootStackNavigationTypes, ROUTERS.ProductDetails>;

export default function ProductDetailsScreen() {
  const route = useRoute<ProductDetailsRoute>();
  const navigation = useNavigation();
  const { productId, title, product: productFromParams } = (route.params as any) || {};
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Header native diganti oleh HeaderBar custom untuk konsistensi UI

  const loadDetail = async (opts?: { silent?: boolean }) => {
    let mounted = true;
    if (!productId) return;
    try {
      if (!opts?.silent) setLoading(true);
      const p = await fetchProductDetail(productId);
      if (mounted) {
        setProduct(p ?? productFromParams ?? null);
        setError(null);
      }
    } catch (e: any) {
      console.log('[ProductDetails] fetch error:', e?.message || e);
      if (mounted) {
        // fallback ke data dari params jika tersedia
        if (productFromParams) {
          setProduct(productFromParams);
          setError(null);
        } else {
          setError('Gagal memuat detail produk');
        }
      }
    } finally {
      if (!opts?.silent && mounted) setLoading(false);
    }
    return () => {
      mounted = false;
    };
  };

  useEffect(() => {
    loadDetail();
  }, [productId]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadDetail({ silent: true });
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return <LoadingState message="Memuat detail produk..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => loadDetail()} />;
  }

  if (!product) {
    return (
      <View style={styles.centerBox}>
        <Text>Produk tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderBar title={title || 'Detail Produk'} showBack onBackPress={() => navigation.goBack()} />
      <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Reusable ProductCard digunakan di bagian atas */}
      {product.images?.length ? (
        <Image source={{ uri: product.images[0] }} style={styles.image} resizeMode="contain" />
      ) : product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      ) : null}
      <Text style={styles.title}>{product.title}</Text>
      {typeof product.rating === 'number' ? (
        <View style={styles.ratingRow}>
          <Rating rating={Math.floor(product.rating)} size={16} spacing={3} />
          <Text style={styles.ratingText}>{product.rating.toFixed ? product.rating.toFixed(1) : product.rating}</Text>
        </View>
      ) : null}
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      {product.brand ? <Text style={styles.meta}>Brand: {product.brand}</Text> : null}
      {product.category ? <Text style={styles.meta}>Category: {product.category}</Text> : null}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  centerBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 240, borderRadius: 12, backgroundColor: '#eee' },
  title: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingText: { marginLeft: 8, fontSize: 13, color: '#666' },
  price: { fontSize: 18, fontWeight: '700', color: '#007AFF', marginTop: 6 },
  description: { fontSize: 14, color: '#333', marginTop: 12, lineHeight: 20 },
  meta: { marginTop: 8, fontSize: 13, color: '#666' },
  backButton: { },
  backText: { },
});