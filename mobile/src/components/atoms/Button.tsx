import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, TouchableOpacityProps, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Typography } from './Typography';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'solid' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'solid',
  isLoading = false,
  disabled,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  
  const isSolid = variant === 'solid';
  const isOutline = variant === 'outline';
  
  const backgroundColor = isSolid ? colors.text : 'transparent';
  const borderColor = isOutline ? colors.text : 'transparent';
  const textColor = isSolid ? colors.background : colors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      style={[
        styles.container,
        {
          backgroundColor: disabled && isSolid ? colors.border : backgroundColor,
          borderColor,
          borderWidth: isOutline ? 2 : 0,
          opacity: disabled && !isSolid ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Typography variant="button" style={{ color: textColor }}>
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
