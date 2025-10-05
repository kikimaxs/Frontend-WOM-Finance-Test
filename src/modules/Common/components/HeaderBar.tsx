import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  style?: ViewStyle;
};

export default function HeaderBar({ title, showBack, onBackPress, rightContent, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftWrap}>
        {showBack ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
        ) : null}
        {title ? <Text numberOfLines={1} style={styles.title}>{title}</Text> : null}
      </View>
      <View style={styles.rightWrap}>{rightContent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A84FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.3)',
  },
  leftWrap: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  backBtn: { marginRight: 8, padding: 4 },
  title: { color: '#fff', fontSize: 18, fontWeight: '700', flexShrink: 1 },
  rightWrap: { flexDirection: 'row', alignItems: 'center' },
});