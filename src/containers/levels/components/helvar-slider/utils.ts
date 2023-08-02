export const handleKeyBoardNavigation = ({
  value,
  defaultValue,
  sliderElement,
  onChange,
}: {
  value: number;
  defaultValue: number;
  sliderElement: HTMLDivElement | null;
  onChange: (value: number) => void;
}) => {
  const getIncrementalValue = (value: number) => {
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (value <= 0 || value > 100) return;

    const incrementValue = getIncrementalValue(value);
    const isMovingLeftOrDown =
      event.key === 'ArrowLeft' || event.key === 'ArrowDown';
    const isMovingRightOrUp =
      event.key === 'ArrowRight' || event.key === 'ArrowUp';

    if (isMovingLeftOrDown) {
      event.preventDefault();
      const newValue = value - incrementValue;
      onChange(getNearestStepValue(newValue));
    } else if (isMovingRightOrUp) {
      event.preventDefault();
      const newValue = value + incrementValue;
      onChange(getNearestStepValue(newValue));
    }
  };

  if (sliderElement) {
    sliderElement.addEventListener('keydown', handleKeyDown);
    return () => {
      sliderElement.removeEventListener('keydown', handleKeyDown);
    };
  }
};

export const getNearestStepValue = (value: number) => {
  if (value <= 1) return value;
  if (value === 2) return 5;
  if (value >= 100) return 100;

  return Math.round(value / 5) * 5;
};
