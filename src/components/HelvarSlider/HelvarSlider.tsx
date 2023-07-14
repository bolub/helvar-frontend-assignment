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

interface CustomSliderProps {
  label: string;
  value: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const CustomSlider: FC<CustomSliderProps> = ({
  label,
  value,
  defaultValue,
  onChange,
}) => {
  return (
    <Slider
      aria-label={label}
      colorScheme='red'
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      step={5}
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
