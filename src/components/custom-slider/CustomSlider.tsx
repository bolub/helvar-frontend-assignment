import { Text, Flex, Slider } from '@mantine/core';
import { FC } from 'react';
import { getNearestStepValue } from './utils';

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
    <Flex justify='space-between' w='100%' align='center'>
      <Text weight='medium' size='18px'>
        {title}
      </Text>

      <Text weight='bold' color='red' size='18px'>
        {value}%
      </Text>
    </Flex>
  );
};

export const CustomSliderComponent: FC<CustomSliderProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  testId,
}) => {
  return (
    <Slider
      id={label}
      // scale={(v: number) => getNearestStepValue(v)}
      value={value}
      defaultValue={defaultValue}
      color='red'
      onChange={(value: number) => onChange(getNearestStepValue(value))}
      min={0}
      max={100}
      data-testId={testId}
    />
  );
};

export const CustomSlider = {
  Label: LabelComponent,
  Slider: CustomSliderComponent,
};
