import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | '600';
  color?: 'primary' | 'secondary' | 'error';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  align = 'left',
  weight,
  color,
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const getFontSize = () => {
    switch (variant) {
      case 'h1': return 32;
      case 'h2': return 24;
      case 'h3': return 20;
      case 'button': return 16;
      case 'caption': return 12;
      case 'body':
      default: return 16;
    }
  };

  const getFontWeight = () => {
    if (weight) return weight;
    if (variant === 'h1' || variant === 'h2' || variant === 'button') return 'bold';
    if (variant === 'h3') return '600';
    return 'normal';
  };

  const getTextColor = () => {
    if (color === 'error') return '#FF3333'; // Only exception to B&W for errors
    if (color === 'secondary') return '#888888'; // Use medium grey for secondary text
    return colors.text;
  };

  return (
    <Text
      style={[
        {
          fontSize: getFontSize(),
          fontWeight: getFontWeight(),
          color: getTextColor(),
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
