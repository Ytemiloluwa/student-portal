import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export const RootNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};
