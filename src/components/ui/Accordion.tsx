import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { Ionicons } from '@expo/vector-icons';

// Obtener dimensiones de la pantalla
const { width: screenWidth } = Dimensions.get('window');

interface AccordionProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  initiallyExpanded?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  extra,
  children,
  onPress,
  style,
  initiallyExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <ThemedView style={[styles.container, style]}>
      <Pressable
        style={[styles.header, isExpanded && styles.headerExpanded]}
        onPress={handlePress}
      >
        <View style={styles.headerContent}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText type="default" style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          )}
        </View>
        <View style={styles.rightContent}>
          {extra}
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#666"
          />
        </View>
      </Pressable>
      {isExpanded && <View style={styles.content}>{children}</View>}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%', // Porcentaje
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16, // Número sin unidad (píxeles)
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    minHeight: 60, // Altura mínima en píxeles
  },
  headerExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContent: {
    flex: 1, // Unidad flex
    marginRight: 8,
    maxWidth: screenWidth * 0.8, // Cálculo basado en el ancho de la pantalla
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  content: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
