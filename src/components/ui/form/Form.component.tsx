import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button } from '../Button';
import { NumberInput } from '../NumberInput';
import { SearchableSelect } from '../SearchableSelect';
import { TextInput } from '../TextInput';
import { FormItem } from './FormItem.component';
import { FormField } from './Form.interface';

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

  const handleBlur = (field: FormField) => {
    const error = validateField(field, values[field.name] || '');
    setErrors((prev) => ({ ...prev, [field.name]: error || '' }));
  };

  const validateField = (
    field: FormField,
    value: string,
  ): string | undefined => {
    if (field.required && !value) {
      return 'Este campo es obligatorio';
    }
    if (field.validation) {
      return field.validation(value);
    }
    return undefined;
  };

  const handleResetForm = () => {
    setErrors({});
    setValues({});
  };

  const hasErrors = useMemo(() => {
    return fields.some((field) =>
      validateField(field, values[field.name] || ''),
    );
  }, [fields, values]);

  const handleSubmit = () => {
    if (!hasErrors) {
      onSubmit(values);
      handleResetForm();
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      value: values[field.name] || '',
      placeholder: field.placeholder,
      error: errors[field.name],
    };

    let inputComponent;
    switch (field.type) {
      case 'number':
        inputComponent = (
          <NumberInput
            {...commonProps}
            onChangeText={(value) => handleChange(field.name, value)}
            onBlur={() => handleBlur(field)}
            min={field.min}
            max={field.max}
            style={styles.input}
            inputStyle={textStyle}
          />
        );
        break;
      case 'select':
        inputComponent = (
          <SearchableSelect
            {...commonProps}
            options={field.options || []}
            onChange={(value) => handleChange(field.name, value)}
            onBlur={() => handleBlur(field)}
            style={styles.input}
            inputStyle={inputStyle}
            textStyle={textStyle}
          />
        );
        break;
      case 'text':
      default:
        inputComponent = (
          <TextInput
            {...commonProps}
            onChangeText={(value) => handleChange(field.name, value)}
            onBlur={() => handleBlur(field)}
            style={styles.input}
            inputStyle={textStyle}
          />
        );
    }

    return (
      <FormItem
        key={field.name}
        label={field.label}
        required={field.required}
        style={styles.fieldContainer}
      >
        {inputComponent}
      </FormItem>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {fields.map((field) => renderField(field))}
      <Button
        title={submitButtonText}
        onPress={handleSubmit}
        variant="primary"
        size="medium"
        disabled={hasErrors}
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
