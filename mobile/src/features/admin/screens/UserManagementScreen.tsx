import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { ListItem } from '../../../components/molecules/ListItem';
import { Button } from '../../../components/atoms/Button';
import { useGetUsersQuery, useSoftDeleteUserMutation, useReactivateUserMutation } from '../userApi';

export const UserManagementScreen = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useSoftDeleteUserMutation();
  const [reactivateUser] = useReactivateUserMutation();

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      if (isActive) {
        await deleteUser(id).unwrap();
        Alert.alert('Success', 'User deactivated');
      } else {
        await reactivateUser(id).unwrap();
        Alert.alert('Success', 'User reactivated');
      }
    } catch (err: any) {
      Alert.alert('Error', err?.data?.message || 'Failed to update user status');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Typography color="error">Failed to load users</Typography>
        <Button title="Retry" variant="outline" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.content || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem 
            title={`${item.firstName} ${item.lastName}`} 
            subtitle={`${item.email} • ${item.role} • ${item.isActive ? 'Active' : 'Inactive'}`} 
            rightElement={
              <Button 
                title={item.isActive ? "Deactivate" : "Reactivate"} 
                variant={item.isActive ? "outline" : "solid"} 
                onPress={() => handleToggleActive(item.id, item.isActive)}
                style={{ height: 35, paddingHorizontal: 10, marginVertical: 0 }}
              />
            }
          />
        )}
        ListEmptyComponent={<Typography align="center" style={styles.empty}>No users found.</Typography>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    marginTop: 40,
  }
});
