import React from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { FormField } from '../../../components/molecules/FormField';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/authSlice';
import { useForm } from 'react-hook-form';
import { useGetStudentMeQuery, useUpdateStudentMeMutation } from '../../students/studentApi';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { data: student, isLoading: isLoadingProfile } = useGetStudentMeQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateStudentMeMutation();

  const { control, handleSubmit } = useForm({
    values: {
      phone: student?.phone || '',
      address: student?.address || '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await updateProfile(data).unwrap();
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error?.data?.message || 'Failed to update profile');
    }
  };

  if (isLoadingProfile) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Typography variant="h1" style={styles.title}>My Profile</Typography>
      
      {student && (
        <View style={styles.infoCard}>
          <Typography variant="h3" style={styles.label}>Student ID: {student.studentNumber}</Typography>
          <Typography variant="body" color="secondary">Department: {student.departmentCode}</Typography>
        </View>
      )}

      <Typography variant="h3" style={styles.sectionTitle}>Update Information</Typography>
      
      <FormField control={control} name="phone" label="Phone Number" keyboardType="phone-pad" />
      <FormField control={control} name="address" label="Address" />

      <Button title="Save Changes" onPress={handleSubmit(onSubmit)} isLoading={isUpdating} style={styles.submitBtn} />
      
      <Button 
        title="Logout" 
        variant="outline" 
        onPress={() => dispatch(logout())} 
        style={styles.logoutButton} 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  infoCard: {
    padding: 20,
    backgroundColor: 'rgba(100,100,100,0.1)',
    borderRadius: 8,
    marginBottom: 30,
  },
  label: {
    marginBottom: 5,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  submitBtn: {
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 40,
    width: '100%',
    borderColor: '#FF3333',
  },
});
