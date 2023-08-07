export const getNearestStepValue = (value: number) => {
  if (value <= 1) return value;
  if (value === 2) return 5;
  if (value >= 100) return 100;

  return Math.round(value / 5) * 5;
};
