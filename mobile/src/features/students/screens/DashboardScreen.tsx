import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';

export const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h1">Dashboard</Typography>
      <Typography variant="body">Welcome to the UniBest Student Portal.</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
