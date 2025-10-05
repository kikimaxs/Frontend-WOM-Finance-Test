import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ROUTERS } from '@/src/routes';

export default function ProductDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { product } = route.params ?? {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: product?.title ?? 'Detail Produk',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 12 }}>
          <Text style={{ color: '#007AFF' }}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, product]);

  if (!product) {
    return (
      <View style={styles.container}> 
        <Text>Produk tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={styles.hero} resizeMode="cover" />
      ) : null}
      <View style={styles.body}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingBottom: 24 },
  hero: { width: '100%', height: 220, backgroundColor: '#f0f0f0' },
  body: { paddingHorizontal: 16, paddingTop: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  brand: { marginTop: 4, fontSize: 12, color: '#666' },
  price: { marginTop: 8, fontSize: 18, color: '#0a7', fontWeight: '700' },
  desc: { marginTop: 8, fontSize: 14, color: '#333' },
});