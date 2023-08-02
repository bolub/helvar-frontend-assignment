import { VStack, Box, Flex, Button, useDisclosure } from '@chakra-ui/react';
import { HelvarSlider } from './components/helvar-slider/HelvarSlider';
import { useState } from 'react';
import { defaultLevelValues } from '../../utils/levels';
import { ResultsModal } from './components/results-modal/ResultsModal';

export const Levels = () => {
  const modalDisclosure = useDisclosure();

  const [levels, setLevels] = useState<{
    occupied: number;
    powerSave: number;
    minimum: number;
  }>({
    occupied: defaultLevelValues.occupied,
    powerSave: defaultLevelValues.powerSave,
    minimum: defaultLevelValues.minimum,
  });

  const setLevelValue = (key: keyof typeof levels, value: number) => {
    setLevels((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [type, setType] = useState<'apply' | 'cancel' | undefined>();

  const onApply = () => {
    setType('apply');
    modalDisclosure.onOpen();
  };

  const onCancel = () => {
    setType('cancel');
    modalDisclosure.onOpen();

    setLevels({
      occupied: defaultLevelValues.occupied,
      powerSave: defaultLevelValues.powerSave,
      minimum: defaultLevelValues.minimum,
    });
  };

  return (
    <>
      <VStack spacing={10}>
        {/* Occupied */}
        <Box w='full'>
          <HelvarSlider.Label title='Occupied' value={levels.occupied} />
          <HelvarSlider.Slider
            label='Occupied'
            defaultValue={defaultLevelValues.occupied}
            onChange={(newValue) => {
              if (newValue <= levels.powerSave) {
                setLevelValue('powerSave', newValue);
              }

              if (newValue <= levels.minimum) {
                setLevelValue('minimum', newValue);
              }

              setLevelValue('occupied', newValue);
            }}
            value={levels.occupied}
            testId='occupied-slider'
          />
        </Box>

        {/* Power save */}
        <Box w='full'>
          <HelvarSlider.Label title='Power save' value={levels.powerSave} />
          <HelvarSlider.Slider
            label='Power save'
            defaultValue={defaultLevelValues.powerSave}
            onChange={(newValue) => {
              if (newValue >= levels.occupied) {
                setLevelValue('occupied', newValue);
              }

              if (newValue <= levels.minimum) {
                setLevelValue('minimum', newValue);
              }

              setLevelValue('powerSave', newValue);
            }}
            value={levels.powerSave}
            testId='power-save-slider'
          />
        </Box>

        {/* Minimum */}
        <Box w='full'>
          <HelvarSlider.Label title='Minimum' value={levels.minimum} />
          <HelvarSlider.Slider
            label='Minimum'
            defaultValue={defaultLevelValues.minimum}
            onChange={(newValue) => {
              if (newValue >= levels.occupied) {
                setLevelValue('occupied', newValue);
              }

              if (newValue >= levels.powerSave) {
                setLevelValue('powerSave', newValue);
              }

              setLevelValue('minimum', newValue);
            }}
            value={levels.minimum}
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

      <ResultsModal
        disclosure={modalDisclosure}
        description={
          type === 'cancel'
            ? 'Luminaire light levels have been reset to their default values'
            : ''
        }
        levels={levels}
      />
    </>
  );
};
