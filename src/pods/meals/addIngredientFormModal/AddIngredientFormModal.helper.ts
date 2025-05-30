export const calculateFoodValues = (
  nutritionValue: number,
  portion: number,
  quantity: number,
) => {
  const portionValue = (nutritionValue * quantity) / portion;
  return Math.round(portionValue);
};
