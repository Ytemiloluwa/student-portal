import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { Input, InputProps } from '../atoms/Input';

interface FormFieldProps extends InputProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

export const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  rules,
  ...inputProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={error?.message}
          {...inputProps}
        />
      )}
    />
  );
};
