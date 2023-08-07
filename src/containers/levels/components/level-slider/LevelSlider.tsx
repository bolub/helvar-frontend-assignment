import { Box } from '@chakra-ui/react';
import { CustomSlider } from 'src/components/custom-slider/CustomSlider';

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
      <CustomSlider.Label title={title} value={value} />
      <CustomSlider.Slider
        label={title}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        testId={testId}
      />
    </Box>
  );
};
