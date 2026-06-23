import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Typography } from '../atoms/Typography';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ title, subtitle, onPress, rightElement }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.container, { borderBottomColor: colors.border }]} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Typography variant="h3">{title}</Typography>
        {subtitle && (
          <Typography variant="body" color="secondary" style={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </View>
      {rightElement && <View style={styles.right}>{rightElement}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  subtitle: {
    marginTop: 4,
  },
  right: {
    marginLeft: 16,
  },
});
