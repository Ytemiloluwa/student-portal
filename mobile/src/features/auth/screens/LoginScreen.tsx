import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { FormField } from '../../../components/molecules/FormField';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../authSlice';
import { useLoginMutation } from '../authApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'student@unibest.edu', password: 'password123' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // MOCK LOGIN FOR TESTING MVP WITHOUT BACKEND
      if (data.email === 'staff@unibest.edu' || data.email === 'student@unibest.edu') {
        const role = data.email.includes('staff') ? 'STAFF' : 'STUDENT';
        dispatch(loginSuccess({ token: 'mock-jwt-token-123', role }));
        return;
      }

      // Typically, password should be hashed or sent securely over HTTPS.
      // The backend plan says `password_hash`, so we map it here.
      const response = await login({ email: data.email, passwordHash: data.password }).unwrap();
      
      // Dispatch to Redux (this updates the store and MMKV, triggering RootNavigator to show MainNavigator)
      dispatch(loginSuccess({ token: response.accessToken, role: response.role }));
    } catch (error: any) {
      Alert.alert('Login Failed', error?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <Typography variant="h1" align="center" style={styles.title}>
          UniBest
        </Typography>
        <Typography variant="body" align="center" color="secondary" style={styles.subtitle}>
          Sign in to the Student Portal
        </Typography>

        <FormField
          control={control}
          name="email"
          label="Email Address"
          placeholder="student@unibest.edu"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormField
          control={control}
          name="password"
          label="Password"
          placeholder="••••••••"
          secureTextEntry
        />

        <Button 
          title="Sign In" 
          onPress={handleSubmit(onSubmit)} 
          isLoading={isLoading} 
          style={styles.loginButton} 
        />

        {/* Temporary buttons for offline/dev testing of the navigators */}
        <View style={styles.devContainer}>
          <Typography variant="caption" align="center" color="secondary">Dev Fast Logins</Typography>
          <View style={styles.devRow}>
            <Button title="Staff" variant="outline" onPress={() => dispatch(loginSuccess({ token: 'dev', role: 'STAFF' }))} style={styles.devBtn} />
            <Button title="Student" variant="outline" onPress={() => dispatch(loginSuccess({ token: 'dev', role: 'STUDENT' }))} style={styles.devBtn} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    marginBottom: 40,
  },
  loginButton: {
    marginTop: 20,
  },
  devContainer: {
    marginTop: 60,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  devRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  devBtn: {
    flex: 1,
    marginHorizontal: 5,
    height: 40,
  }
});
