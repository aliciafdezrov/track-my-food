import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ThemedText } from '../ThemedText';

interface NumberInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
  min?: number;
  max?: number;
  label?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  error,
  min,
  max,
  label,
}) => {
  const handleChange = (text: string) => {
    // Solo permitir números y punto decimal
    const numericValue = text.replace(/[^0-9.]/g, '');

    // Validar que no haya más de un punto decimal
    const parts = numericValue.split('.');
    if (parts.length > 2) return;

    // Validar rango si se especificó
    if (numericValue) {
      const num = parseFloat(numericValue);
      if (min !== undefined && num < min) return;
      if (max !== undefined && num > max) return;
    }

    onChangeText(numericValue);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <TextInput
        style={[styles.input, inputStyle, error && styles.inputError]}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        keyboardType="numeric"
      />
      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});
