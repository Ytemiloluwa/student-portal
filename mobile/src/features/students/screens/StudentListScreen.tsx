import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { ListItem } from '../../../components/molecules/ListItem';
import { useGetStudentsQuery } from '../studentApi';
import { Button } from '../../../components/atoms/Button';

export const StudentListScreen = () => {
  const { data, isLoading, error, refetch } = useGetStudentsQuery();

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
        <Typography color="error">Failed to load students</Typography>
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
            title={`Student ${item.studentNumber}`} 
            subtitle={`${item.degreeType} - ${item.departmentCode}`} 
            onPress={() => console.log('Navigate to details')} 
          />
        )}
        ListEmptyComponent={<Typography align="center" style={styles.empty}>No students enrolled yet.</Typography>}
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
