import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text } from 'react-native';
import { Button } from './Button';
import { NumberInput } from './NumberInput';
import { SearchableSelect } from './SearchableSelect';
import { TextInput } from './TextInput';

interface Option {
  label: string;
  value: string;
}

interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select';
  required?: boolean;
  validation?: (value: string) => string | undefined;
  options?: Option[]; // Solo para campos de tipo select
  min?: number; // Solo para campos de tipo number
  max?: number; // Solo para campos de tipo number
}

interface FormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, string>) => void;
  submitButtonText?: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitButtonText = 'Enviar',
  style,
  inputStyle,
  textStyle,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateField = (
    field: FormField,
    value: string,
  ): string | undefined => {
    if (field.required && !value) {
      return 'Este campo es requerido';
    }
    if (field.validation) {
      return field.validation(value);
    }
    return undefined;
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach((field) => {
      const error = validateField(field, values[field.name] || '');
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit(values);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      value: values[field.name] || '',
      placeholder: field.placeholder,
      error: errors[field.name],
      label: field.label,
    };

    switch (field.type) {
      case 'number':
        return (
          <NumberInput
            {...commonProps}
            onChangeText={(value) => handleChange(field.name, value)}
            min={field.min}
            max={field.max}
            style={styles.input}
            inputStyle={textStyle}
          />
        );
      case 'select':
        return (
          <SearchableSelect
            {...commonProps}
            options={field.options || []}
            onChange={(value) => handleChange(field.name, value)}
            style={styles.input}
            inputStyle={inputStyle}
            textStyle={textStyle}
          />
        );
      case 'text':
      default:
        return (
          <TextInput
            {...commonProps}
            onChangeText={(value) => handleChange(field.name, value)}
            style={styles.input}
            inputStyle={textStyle}
          />
        );
    }
  };

  return (
    <View style={[styles.container, style]}>
      {fields.map((field) => (
        <View key={field.name} style={styles.fieldContainer}>
          {renderField(field)}
        </View>
      ))}
      <Button
        title={submitButtonText}
        onPress={handleSubmit}
        variant="primary"
        size="medium"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
  },
  fieldContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
});
