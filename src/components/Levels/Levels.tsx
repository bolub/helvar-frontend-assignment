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
              //if occupied is less than power save, set power save to occupied
              if (newValue <= powerSave) {
                setPowerSave(newValue);
              }

              //if occupied is less than minimum, set minimum to occupied
              if (newValue <= minimum) {
                setMinimum(newValue);
              }

              setOccupied(newValue);
            }}
            value={occupied}
          />
        </Box>

        {/* Power save */}
        <Box w='full'>
          <HelvarSlider.Label title='Power save' value={powerSave} />
          <HelvarSlider.Slider
            label='Power save'
            defaultValue={defaultLevelValues.powerSave}
            onChange={(newValue) => {
              //if PS is greater than occupied, set occupied to PS
              if (newValue >= occupied) {
                setOccupied(newValue);
              }

              //if PS is less than minimum, set minimum to PS
              if (newValue <= minimum) {
                setMinimum(newValue);
              }

              setPowerSave(newValue);
            }}
            value={powerSave}
          />
        </Box>

        {/* Minimum */}
        <Box w='full'>
          <HelvarSlider.Label title='Minimum' value={minimum} />
          <HelvarSlider.Slider
            label='Minimum'
            defaultValue={defaultLevelValues.minimum}
            onChange={(newValue) => {
              //if minimum is greater than occupied, set occupied to minimum
              if (newValue >= occupied) {
                setOccupied(newValue);
              }

              //if minimum is greater than power save, set power save to minimum
              if (newValue >= powerSave) {
                setPowerSave(newValue);
              }

              setMinimum(newValue);
            }}
            value={minimum}
          />
        </Box>
      </VStack>

      <Flex mt={16} justifyContent='space-between' w='full'>
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
