import React from 'react';
import { NavigationContainer as NativeNavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'react-navigation-helpers';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

type Props = {
  children: React.ReactNode;
};

export default function NavigationContainer({ children }: Props) {
  return (
    <NativeNavigationContainer ref={navigationRef}>
      {children}
    </NativeNavigationContainer>
  );
}