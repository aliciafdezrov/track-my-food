import { Days } from '../constants/Days';

export function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  return Days[date.getDay()];
}

export function getFormattedDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Obtiene YYYY-MM-DD
}

export function getWeekRange(): {
  startOfWeek: string;
  endOfWeek: string;
} {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Establece al inicio de la semana (domingo)
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Establece al final de la semana (sábado)
  endOfWeek.setHours(23, 59, 59, 999);

  return {
    startOfWeek: startOfWeek.toISOString(),
    endOfWeek: endOfWeek.toISOString(),
  };
}

export function getDateRange(): {
  startOfDay: string;
  endOfDay: string;
} {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).toISOString();
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  ).toISOString();

  return {
    startOfDay,
    endOfDay,
  };
}

export function getCurrentDate(): string {
  const today = new Date();
  return today.toISOString();
}
