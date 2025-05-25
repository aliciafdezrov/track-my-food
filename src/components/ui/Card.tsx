import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  style,
}) => {
  const Container = onPress ? Pressable : View;

  return (
    <Container style={[styles.container, style]} onPress={onPress}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText type="default" style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          )}
        </View>
        {children && <View style={styles.body}>{children}</View>}
      </ThemedView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  body: {
    marginTop: 8,
  },
});
