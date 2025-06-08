import { ThemedView } from '@/components/ThemedView';
import { ButtonGroup } from '@/src/components/ui/ButtonGroup';
import {
  getCurrentWeekMeals,
  getTodayMeals,
} from '@/src/features/meal/services/Database';
import { useScreenFocus } from '@/src/hooks/useScreenFocus';
import { SummaryList } from '@/src/pods/summary/mealsList/SummaryList.component';
import {
  mapMealListToSummaryList,
  mapWeeklyMealListToSummaryList,
} from '@/src/pods/summary/Summary.mapper';
import { SummaryVM } from '@/src/pods/summary/Summary.vm';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useCallback, useEffect, useState } from 'react';

const options = ['Hoy', 'Esta semana'];

export function SummaryContent() {
  const [summary, setSummary] = useState<SummaryVM[]>([]);
  const db = useSQLiteContext();
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTodayMealsFromDb = useCallback(async () => {
    const result = await getTodayMeals(db);
    setSummary(mapMealListToSummaryList(result));
  }, [db]);

  const getCurrentWeekMealsFromDb = useCallback(async () => {
    const result = await getCurrentWeekMeals(db);
    setSummary(mapWeeklyMealListToSummaryList(result));
  }, [db]);

  const getMeals = useCallback(
    async (selectedOption: string) => {
      if (selectedOption === options[0]) {
        getTodayMealsFromDb();
      } else {
        getCurrentWeekMealsFromDb();
      }
    },
    [selectedOption, getTodayMeals, getCurrentWeekMeals],
  );

  const handleSelectOption = async (option: string) => {
    setSelectedOption(option);
    getMeals(option);
  };

  const loadMeals = useCallback(async () => {
    setIsLoading(true);
    getMeals(selectedOption);
    setIsLoading(false);
  }, [selectedOption, getMeals]);

  useScreenFocus(() => loadMeals());

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
