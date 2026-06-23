import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { DashboardScreen } from '../features/students/screens/DashboardScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { UserManagementScreen } from '../features/admin/screens/UserManagementScreen';
import { StudentListScreen } from '../features/students/screens/StudentListScreen';
import { useTheme } from '@react-navigation/native';
import { Typography } from '../components/atoms/Typography';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.border,
        tabBarLabel: ({ focused, color, children }) => (
          <Typography variant="caption" weight={focused ? 'bold' : 'normal'} style={{ color }}>
            {children}
          </Typography>
        ),
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      
      {(role === 'ADMIN' || role === 'STAFF') && (
        <Tab.Screen name="Students" component={StudentListScreen} />
      )}
      
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
