export const getIncrementalValue = ({
  value,
  isMovingUp,
}: {
  value: number;
  isMovingUp?: boolean;
}) => {
  // So we can skip all values between 0 and 1
  if (value <= 1) return 1;

  // So we can jump from 2 -> 5
  if (isMovingUp && value === 2) return 3;

  // So we can jump from 5 -> 1 and from 5 -> 10 (getNearestStep value handles this)
  if (value === 5) return 4;

  return 5;
};

export const getNearestStepValue = (value: number) => {
  if (value <= 1) return value;
  if (value === 2) return 5;
  if (value >= 100) return 100;

  return Math.round(value / 5) * 5;
};

export const handleSliderKeyDown = (
  event: KeyboardEvent,
  value: number,
  onChange: (newValue: number) => void
) => {
  if (value <= 0 || value > 100) return;

  const isMovingDown = ['ArrowLeft', 'ArrowDown'].includes(event.key);
  const isMovingUp = ['ArrowRight', 'ArrowUp'].includes(event.key);

  const incrementalValue = getIncrementalValue({
    value,
    isMovingUp,
  });

  if (isMovingDown || isMovingUp) {
    const newValue = isMovingDown
      ? value - incrementalValue
      : value + incrementalValue;

    const nearestStepValue = getNearestStepValue(newValue);

    onChange(nearestStepValue);
    event.preventDefault();
  }
};
