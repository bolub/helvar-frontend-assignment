export const getIncrementalValue = ({
  value,
  defaultValue,
}: {
  value: number;
  defaultValue: number;
}) => {
  const isMovingUp = value > defaultValue;
  const isMovingDown = value < defaultValue;

  if (isMovingUp) {
    if (value <= 1) return 1;
    if (value === 2) return 3;
  }

  if (isMovingDown && value <= 1) {
    return 1;
  }

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
  defaultValue: number,
  onChange: (newValue: number) => void
) => {
  if (value <= 0 || value > 100) return;

  const incrementValue = getIncrementalValue({
    value,
    defaultValue,
  });

  const isMovingLeftOrDown = ['ArrowLeft', 'ArrowDown'].includes(event.key);
  const isMovingRightOrUp = ['ArrowRight', 'ArrowUp'].includes(event.key);

  if (isMovingLeftOrDown || isMovingRightOrUp) {
    const newValue = isMovingLeftOrDown
      ? value - incrementValue
      : value + incrementValue;
    onChange(getNearestStepValue(newValue));
    event.preventDefault();
  }
};
