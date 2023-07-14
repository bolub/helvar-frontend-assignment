import { VStack, Box, Flex, Button } from '@chakra-ui/react';
import { HelvarSlider } from '../HelvarSlider/HelvarSlider';
import { useState } from 'react';

const defaultValues = {
  occupied: 80,
  powerSave: 20,
  minimum: 0,
};

export const Levels = () => {
  const [occupied, setOccupied] = useState<number>(defaultValues.occupied);
  const [powerSave, setPowerSave] = useState<number>(defaultValues.powerSave);
  const [minimum, setMinimum] = useState<number>(defaultValues.minimum);

  const onApply = () => {
    console.log('============ Luminaire light levels ============');
    console.log('Occupied:', `${occupied}%`);
    console.log('Power save:', `${powerSave}%`);
    console.log('Minimum:', `${minimum}%`);
    console.log('================================================');
  };

  const onCancel = () => {
    console.log(
      'Luminaire light levels have been reset to their original values'
    );

    setOccupied(defaultValues.occupied);
    setPowerSave(defaultValues.powerSave);
    setMinimum(defaultValues.minimum);
  };

  return (
    <>
      <VStack spacing={10}>
        {/* Occupied */}
        <Box w='full'>
          <HelvarSlider.Label title='Occupied' value={occupied} />
          <HelvarSlider.Slider
            label='Occupied'
            defaultValue={defaultValues.occupied}
            onChange={(value) => setOccupied(value)}
            value={occupied}
          />
        </Box>

        {/* Power save */}
        <Box w='full'>
          <HelvarSlider.Label title='Power save' value={powerSave} />
          <HelvarSlider.Slider
            label='Power save'
            defaultValue={defaultValues.powerSave}
            onChange={(value) => setPowerSave(value)}
            value={powerSave}
          />
        </Box>

        {/* Minimum */}
        <Box w='full'>
          <HelvarSlider.Label title='Minimum' value={minimum} />
          <HelvarSlider.Slider
            label='Minimum'
            defaultValue={defaultValues.minimum}
            onChange={(value) => setMinimum(value)}
            value={minimum}
          />
        </Box>
      </VStack>

      <Flex mt={8} justifyContent='space-between' w='full'>
        <Button size='lg' onClick={onCancel}>
          Cancel
        </Button>
        <Button size='lg' colorScheme='red' onClick={onApply}>
          Apply
        </Button>
      </Flex>
    </>
  );
};
