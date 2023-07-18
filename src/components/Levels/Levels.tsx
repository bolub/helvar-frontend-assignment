import { VStack, Box, Flex, Button } from '@chakra-ui/react';
import { HelvarSlider } from '../HelvarSlider/HelvarSlider';
import { useState } from 'react';
import { defaultLevelValues } from '../../utils/levels';

export const Levels = () => {
  const [occupied, setOccupied] = useState<number>(defaultLevelValues.occupied);
  const [powerSave, setPowerSave] = useState<number>(
    defaultLevelValues.powerSave
  );
  const [minimum, setMinimum] = useState<number>(defaultLevelValues.minimum);

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

    setOccupied(defaultLevelValues.occupied);
    setPowerSave(defaultLevelValues.powerSave);
    setMinimum(defaultLevelValues.minimum);
  };

  return (
    <>
      <VStack spacing={10}>
        {/* Occupied */}
        <Box w='full'>
          <HelvarSlider.Label title='Occupied' value={occupied} />
          <HelvarSlider.Slider
            label='Occupied'
            defaultValue={defaultLevelValues.occupied}
            onChange={(newValue) => {
              if (newValue <= powerSave) {
                setPowerSave(newValue);
              }

              if (newValue <= minimum) {
                setMinimum(newValue);
              }

              setOccupied(newValue);
            }}
            value={occupied}
            testId='occupied-slider'
          />
        </Box>

        {/* Power save */}
        <Box w='full'>
          <HelvarSlider.Label title='Power save' value={powerSave} />
          <HelvarSlider.Slider
            label='Power save'
            defaultValue={defaultLevelValues.powerSave}
            onChange={(newValue) => {
              if (newValue >= occupied) {
                setOccupied(newValue);
              }

              if (newValue <= minimum) {
                setMinimum(newValue);
              }

              setPowerSave(newValue);
            }}
            value={powerSave}
            testId='power-save-slider'
          />
        </Box>

        {/* Minimum */}
        <Box w='full'>
          <HelvarSlider.Label title='Minimum' value={minimum} />
          <HelvarSlider.Slider
            label='Minimum'
            defaultValue={defaultLevelValues.minimum}
            onChange={(newValue) => {
              if (newValue >= occupied) {
                setOccupied(newValue);
              }

              if (newValue >= powerSave) {
                setPowerSave(newValue);
              }

              setMinimum(newValue);
            }}
            value={minimum}
            testId='minimum-slider'
          />
        </Box>
      </VStack>

      <Flex mt={16} justifyContent='space-between' w='full'>
        <Button data-cy='cancel' size='lg' onClick={onCancel}>
          Cancel
        </Button>
        <Button data-cy='apply' size='lg' colorScheme='red' onClick={onApply}>
          Apply
        </Button>
      </Flex>
    </>
  );
};
