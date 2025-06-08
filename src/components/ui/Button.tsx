import {
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'default';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fitContent?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
}

export function Button({
  onPress,
  title = '',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  fitContent = true,
  icon,
  iconSize = 20,
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getBackgroundColor = () => {
    if (disabled) return colors.textSecondary;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
      case 'default':
        return 'transparent';
      case 'danger':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.background;
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return colors.background;
      case 'outline':
        return colors.primary;
      case 'default':
        return colors.text;
      default:
        return colors.background;
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors.textSecondary;
    switch (variant) {
      case 'default':
        return colors.textSecondary;
      case 'outline':
        return colors.primary;
      default:
        return 'transparent';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[variant],
        styles[size],
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
        disabled && styles.disabled,
        fitContent && styles.fitContentWidth,
        style,
      ]}
    >
      <View style={styles.contentContainer}>
        {icon && (
          <MaterialIcons name={icon} size={iconSize} color={getTextColor()} />
        )}
        {title && (
          <Text
            style={[
              styles.text,
              styles[`${variant}Text`],
              styles[`${size}Text`],
              { color: getTextColor() },
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {},
  secondary: {},
  outline: {
    borderWidth: 1,
  },
  danger: {
    borderWidth: 1,
  },
  default: {
    borderWidth: 1,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {},
  secondaryText: {},
  outlineText: {},
  dangerText: {},
  defaultText: {},
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {},
  fitContentWidth: {
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
