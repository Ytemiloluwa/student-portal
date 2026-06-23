import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { FormField } from '../../../components/molecules/FormField';
import { Button } from '../../../components/atoms/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEnrollStudentMutation } from '../studentApi';

const enrollSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  departmentCode: z.string().length(2), // e.g. CO
  degreeType: z.enum(['U', 'P']),
  enrollmentYear: z.number().int().min(2000).max(2100),
});

type EnrollFormValues = z.infer<typeof enrollSchema>;

export const EnrollmentScreen = () => {
  const [enroll, { isLoading }] = useEnrollStudentMutation();

  const { control, handleSubmit, reset } = useForm<EnrollFormValues>({
    resolver: zodResolver(enrollSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      departmentCode: '',
      degreeType: 'U',
      enrollmentYear: new Date().getFullYear(),
    },
  });

  const onSubmit = async (data: EnrollFormValues) => {
    try {
      await enroll(data).unwrap();
      Alert.alert('Success', 'Student enrolled successfully');
      reset();
    } catch (error: any) {
      Alert.alert('Error', error?.data?.message || 'Failed to enroll student');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Typography variant="h2" style={styles.title}>Enroll New Student</Typography>
      
      <FormField control={control} name="email" label="Email Address" autoCapitalize="none" />
      <FormField control={control} name="firstName" label="First Name" />
      <FormField control={control} name="lastName" label="Last Name" />
      
      <FormField control={control} name="departmentCode" label="Department Code (e.g. CO)" autoCapitalize="characters" maxLength={2} />
      
      <View style={styles.row}>
        <View style={styles.half}>
          <FormField control={control} name="degreeType" label="Degree (U or P)" autoCapitalize="characters" maxLength={1} />
        </View>
        <View style={styles.half}>
           {/* In a real app, you'd use a masked input or picker for numbers */}
          <FormField control={control} name="enrollmentYear" label="Year" keyboardType="numeric" />
        </View>
      </View>

      <Button title="Submit Enrollment" onPress={handleSubmit(onSubmit)} isLoading={isLoading} style={styles.submitBtn} />
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
  title: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  submitBtn: {
    marginTop: 30,
  }
});
