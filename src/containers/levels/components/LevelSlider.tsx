import { Box } from '@chakra-ui/react';
import { HelvarSlider } from './helvar-slider/HelvarSlider';

export const LevelSlider = ({
  title,
  value,
  defaultValue,
  onChange,
  testId,
}: {
  title: string;
  value: number;
  defaultValue: number;
  onChange: (value: number) => void;
  testId: string;
}) => {
  return (
    <Box w='full'>
      <HelvarSlider.Label title={title} value={value} />
      <HelvarSlider.Slider
        label={title}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        testId={testId}
      />
    </Box>
  );
};
