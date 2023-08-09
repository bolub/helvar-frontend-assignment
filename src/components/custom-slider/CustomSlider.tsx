import { FC, useEffect, useRef } from 'react';
import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import {
  getNearestStepValue,
  handleSliderKeyDown,
} from 'src/components/custom-slider/utils';

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

const LabelComponent: FC<LabelProps> = ({ title, value }) => {
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

const CustomSliderComponent: FC<CustomSliderProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  testId,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Handling keyboard navigation
  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (sliderElement) {
      const handleKeyDown = (event: KeyboardEvent) => {
        handleSliderKeyDown(event, value, onChange);
      };

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
      onChange={(value: number) => onChange(getNearestStepValue(value))}
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

export const CustomSlider = {
  Label: LabelComponent,
  Slider: CustomSliderComponent,
};
