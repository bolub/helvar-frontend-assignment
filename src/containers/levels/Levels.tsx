import { VStack, Flex, Button, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { defaultLevelValues } from '../../utils/levels';
import { ResultsModal } from './components/results-modal/ResultsModal';
import { LevelSlider } from './components/LevelSlider';

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
        <LevelSlider
          title='Occupied'
          value={levels.occupied}
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
          testId='occupied-slider'
        />

        {/* Power save */}
        <LevelSlider
          title='Power Save'
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

        {/* Minimum */}
        <LevelSlider
          title='Minimum'
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
