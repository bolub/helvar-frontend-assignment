import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { FC } from 'react';

interface LabelProps {
  title: string;
  value: number;
}

interface CustomSliderProps {
  label: string;
  value: number;
  defaultValue?: number;
  onChange: (value: number) => void;
}

const Label: FC<LabelProps> = ({ title, value }) => {
  return (
    <>
      <Flex justifyContent='space-between' w='100%' alignItems='center'>
        <Text fontWeight='medium' fontSize='lg'>
          {title}
        </Text>

        <Text fontWeight='extrabold' color='red.500' fontSize='lg'>
          {value}%
        </Text>
      </Flex>
    </>
  );
};

const CustomSlider: FC<CustomSliderProps> = ({
  label,
  value,
  defaultValue,
  onChange,
}) => {
  // TODO: Write a unit test for this function
  const getNearestStepValue = (value: number) => {
    if (value <= 1) return value;
    if (value === 2) return 1;
    if (value >= 100) return 100;

    const nearestStep = Math.round(value / 5) * 5;

    return nearestStep;
  };

  return (
    <Slider
      aria-label={label}
      id={label}
      colorScheme='red'
      defaultValue={defaultValue}
      value={value}
      onChange={(value) => onChange(getNearestStepValue(value))}
      max={100}
    >
      <SliderTrack bg='red.200'>
        <SliderFilledTrack bg='tomato' />
      </SliderTrack>
      <SliderThumb bgColor='red.500' />
    </Slider>
  );
};

export const HelvarSlider = {
  Label,
  Slider: CustomSlider,
};
