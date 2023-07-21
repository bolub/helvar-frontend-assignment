import { FC, useEffect, useRef } from 'react';
import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

interface CustomSliderProps {
  defaultValue: number;
  label: string;
  onChange: (value: number) => void;
  testId: string;
  value: number;
}

interface LabelProps {
  title: string;
  value: number;
}

const Label: FC<LabelProps> = ({ title, value }) => {
  return (
    <Flex justifyContent='space-between' w='100%' alignItems='center'>
      <Text fontWeight='medium' fontSize='lg'>
        {title}
      </Text>

      <Text fontWeight='extrabold' color='red.500' fontSize='lg'>
        {value}%
      </Text>
    </Flex>
  );
};

const CustomSlider: FC<CustomSliderProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  testId,
}) => {

  const getNearestStepValue = (value: number) => {
    if (value <= 1) return value;
    if (value === 2) return 5;

    return Math.round(value / 5) * 5;
  };

  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getIncrementalValue = (value: number) => {
      const isDraggingUp = value > defaultValue;
      const isDraggingDown = value < defaultValue;

      if (isDraggingUp) {
        if (value <= 1) return 1;
        if (value === 2) return 3;
      }

      if (isDraggingDown) {
        if (value <= 1) return 1;
        if (value === 5) return 4;
      }

      return 5;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (value === 0) return;

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

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('keydown', handleKeyDown);
      return () => {
        sliderElement.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [value, onChange, defaultValue]);

  return (
    <Slider
      aria-label={label}
      id={label}
      colorScheme='red'
      defaultValue={defaultValue}
      value={value}
      onChange={(value) => onChange(getNearestStepValue(value))}
      max={100}
      min={0}
      data-cy={`${testId}-container`}
    >
      <SliderTrack bg='red.200'>
        <SliderFilledTrack bg='tomato' />
      </SliderTrack>
      <SliderThumb ref={sliderRef} bgColor='red.500' data-cy={testId} />
    </Slider>
  );
};

export const HelvarSlider = {
  Label,
  Slider: CustomSlider,
};
