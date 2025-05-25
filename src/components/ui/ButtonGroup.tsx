import { StyleSheet, View } from 'react-native';
import { Button } from './Button';
import React, { useCallback } from 'react';

interface ButtonGroupProps {
  value: string;
  options: string[];
  onSelectOption: (option: string) => void;
}

export function ButtonGroup({
  value,
  options,
  onSelectOption,
}: ButtonGroupProps) {
  const isOptionSelected = (option: string) => {
    return option === value;
  };

  const handleSelectOption = (option: string) => {
    onSelectOption(option);
  };

  const getButtonBorderStyle = (index: number) => {
    if (index === 0) return styles.buttonWithoutRightBorderRadius;
    if (index === options.length - 1)
      return styles.buttonWithoutLeftBorderRadius;
    return styles.buttonWithoutBorderRadius;
  };

  const getButtonVariant = (index: number) => {
    if (isOptionSelected(options[index])) return 'outline';
    return 'default';
  };

  return (
    <View style={styles.buttonGroup}>
      {options.map((option, index) => (
        <Button
          key={index}
          variant={getButtonVariant(index)}
          size="small"
          title={option}
          onPress={() => handleSelectOption(option)}
          style={getButtonBorderStyle(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonWithoutRightBorderRadius: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonWithoutLeftBorderRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonWithoutBorderRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
