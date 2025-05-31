import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '../../ThemedText';

interface FormItemProps {
  label?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  required?: boolean;
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  children,
  style,
  required,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <ThemedText style={styles.label}>
          {label}
          {required && <ThemedText style={styles.required}> *</ThemedText>}
        </ThemedText>
      )}
      {children}
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
  required: {
    color: '#FF3B30',
  },
});
