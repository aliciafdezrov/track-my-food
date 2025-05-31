import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Accordion } from '@/src/components/ui/Accordion';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SummaryVM } from '../Summary.vm';

interface SummaryListProps {
  summaryList: SummaryVM[];
}

export function SummaryList({ summaryList }: SummaryListProps) {
  const column = (label: string, value: string) => (
    <ThemedView style={styles.nutritionItem}>
      <ThemedText type="default" style={styles.nutritionLabel}>
        {label}
      </ThemedText>
      <ThemedText type="defaultSemiBold">{value}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {summaryList.map((summary) => (
        <Accordion
          key={summary.title}
          title={summary.title}
          subtitle={summary.subtitle}
        >
          <View style={styles.nutritionInfo}>
            {column('Calorías', `${summary.kcal} kcal`)}
            {column('Proteínas', `${summary.protein}g`)}
            {column('Carbos', `${summary.carbs}g`)}
            {column('Grasas', `${summary.fat}g`)}
          </View>
        </Accordion>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  nutritionItem: {
    flex: 1,
    minWidth: '45%',
  },
  nutritionLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
});
