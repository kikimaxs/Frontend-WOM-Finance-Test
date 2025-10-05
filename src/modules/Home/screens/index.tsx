import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTERS, RootStackNavigationTypes } from '@/src/routes';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '@/src/stores/reducers/auth';
import { clearTokens, clearUser } from '@/src/utils/secureStore';
import { RootState } from '@/src/configs/store';
import { fetchProducts, Product } from '@/src/utils/productsApi';
import ProductCard from '@/src/modules/Product/components/ProductCard';
import LoadingState from '@/src/modules/Common/components/LoadingState';
import ErrorState from '@/src/modules/Common/components/ErrorState';

export default function HomeAttendanceScreens() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackNavigationTypes>>();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => (state as any).auth);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadProducts = async (opts?: { silent?: boolean }) => {
    let mounted = true;
    try {
      if (!opts?.silent) setLoading(true);
      const items = await fetchProducts();
      if (mounted) {
        setProducts(items);
        setError(null);
      }
    } catch (e: any) {
      console.log('[Home] fetchProducts error:', e?.message || e);
      if (mounted) setError('Gagal memuat produk');
    } finally {
      if (!opts?.silent && mounted) setLoading(false);
    }
    return () => {
      mounted = false;
    };
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadProducts({ silent: true });
    } finally {
      setRefreshing(false);
    }
  };
  const handleLogout = async () => {
    await clearTokens();
    await clearUser();
    dispatch(clearAuth());
    navigation.navigate(ROUTERS.AuthMain as never);
  };
  const handlePressProduct = (item: Product) => {
    navigation?.navigate(ROUTERS.ProductDetails, {
      productId: item.id,
      title: item.title,
      product: item,
    });
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
      <View style={styles.listContainer}>
        {loading ? (
          <LoadingState message="Memuat produk..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => loadProducts()} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={() => handlePressProduct(item)} width={ITEM_WIDTH} variant="grid" />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada produk</Text>}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
}

const CARD_GAP = 12;
const CARD_HORIZONTAL_PADDING = 16;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH - CARD_HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 24, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 24, fontWeight: 'bold' },
  logoutButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#eee', borderRadius: 6 },
  logoutText: { color: '#d00', fontWeight: '600' },
  subtitle: { marginTop: 8, fontSize: 14, color: '#666' },
  listContainer: { flex: 1, marginTop: 12 },
  listContent: { paddingBottom: 24 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: CARD_GAP },
  card: { width: ITEM_WIDTH },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#777' },
});