import { FC, useEffect, useRef } from 'react';
import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { getNearestStepValue, handleKeyBoardNavigation } from './utils';

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
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Handling keyboard navigation
  useEffect(() => {
    handleKeyBoardNavigation({
      value,
      defaultValue,
      sliderElement: sliderRef.current,
      onChange,
    });
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
