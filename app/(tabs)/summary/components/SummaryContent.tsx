import { ThemedView } from '@/components/ThemedView';
import { ButtonGroup } from '@/src/components/ui/ButtonGroup';
import {
  getCurrentWeekMeals,
  getTodayMeals,
} from '@/src/features/meal/services/Database';
import { SummaryList } from '@/src/pods/summary/mealsList/SummaryList.component';
import { mapMealListToSummaryList, mapWeeklyMealListToSummaryList } from '@/src/pods/summary/Summary.mapper';
import { SummaryVM } from '@/src/pods/summary/Summary.vm';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';

const options = ['Hoy', 'Esta semana'];

export function SummaryContent() {
  const [summary, setSummary] = useState<SummaryVM[]>([]);
  const db = useSQLiteContext();
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMeals = async () => {
      setIsLoading(true);
      const result = await getTodayMeals(db);
      setSummary(mapMealListToSummaryList(result));
      setIsLoading(false);
    };

    loadMeals();
  }, []);

  const handleSelectOption = async (option: string) => {
    setSelectedOption(option);

    if (option === options[0]) {
      const result = await getTodayMeals(db);
      setSummary(mapMealListToSummaryList(result));
    } else {
      const result = await getCurrentWeekMeals(db);
      setSummary(mapWeeklyMealListToSummaryList(result));
    }
  };

  return (
    <ThemedView>
      <ButtonGroup
        value={selectedOption}
        options={options}
        onSelectOption={handleSelectOption}
      />
      <SummaryList summaryList={summary} />
    </ThemedView>
  );
}
