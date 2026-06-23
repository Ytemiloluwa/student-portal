import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Typography } from './Typography';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="caption" weight="600" style={[styles.label, { color: isFocused ? colors.text : '#888888' }]}>
          {label.toUpperCase()}
        </Typography>
      )}
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.card,
            borderColor: error ? '#FF3333' : isFocused ? colors.text : '#888888',
          },
          style,
        ]}
        placeholderTextColor="#888888"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error ? (
        <Typography variant="caption" color="error" style={styles.errorText}>
          {error}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    letterSpacing: 1,
  },
  input: {
    height: 55,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    marginTop: 6,
  },
});
