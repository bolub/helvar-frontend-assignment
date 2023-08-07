import { Button, Stack, Flex } from '@mantine/core';
import { LevelSlider } from './components/LevelSlider';
import { defaultLevelValues } from '../../utils/levels';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ResultsModal } from '../ResultsModal';

const ActionButtons = ({
  onApply,
  onCancel,
}: {
  onApply: () => void;
  onCancel: () => void;
}) => {
  return (
    <Flex mt='90px' justify='space-between' w='100%'>
      <Button data-cy='cancel' size='md' onClick={onCancel} color='gray'>
        Cancel
      </Button>
      <Button data-cy='apply' size='md' color='red' onClick={onApply}>
        Apply
      </Button>
    </Flex>
  );
};

export const Levels = () => {
  const modalDisclosure = useDisclosure(false);

  const [type, setType] = useState<'apply' | 'cancel' | undefined>();
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

  return (
    <>
      <Stack spacing={60} mt={20}>
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
      </Stack>

      <ActionButtons
        onApply={() => {
          setType('apply');
          modalDisclosure[1].open();
        }}
        onCancel={() => {
          setType('cancel');
          modalDisclosure[1].open();

          setLevels({
            occupied: defaultLevelValues.occupied,
            powerSave: defaultLevelValues.powerSave,
            minimum: defaultLevelValues.minimum,
          });
        }}
      />

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
