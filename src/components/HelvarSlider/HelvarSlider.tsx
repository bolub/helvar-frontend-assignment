import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

interface LabelProps {
  title: string;
  value: number;
}

interface CustomSliderProps {
  label: string;
  value: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
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
  const [step, setStep] = useState<number>(1);

  const sliderOnChange = (value: number) => {
    if (value >= 1) {
      setStep(5);
    } else {
      setStep(1);
    }

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Slider
      aria-label={label}
      colorScheme='red'
      defaultValue={defaultValue}
      value={value}
      onChange={sliderOnChange}
      step={step}
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
