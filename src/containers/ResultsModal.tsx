import { Button, Modal, Text, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const ResultsModal = ({
  disclosure,
  description,
  levels,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
  description?: string;
  levels: {
    occupied: number;
    powerSave: number;
    minimum: number;
  };
}) => {
  const [opened, { open, close }] = disclosure;

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={
          <Text weight='bold' size='24px' color='red'>
            Luminaire light levels
          </Text>
        }
      >
        <Box pt={3}>
          {description && (
            <Text mb='20px' weight='medium'>
              {description}
            </Text>
          )}

          <Text mb='10px'>
            Occupied:{' '}
            <Text component='span' data-cy='occupied-value' weight='bold'>
              {levels.occupied}
            </Text>
            <b>%</b>
          </Text>
          <Text mb='10px'>
            Power save:{' '}
            <Text component='span' data-cy='power-save-value' weight='bold'>
              {levels.powerSave}
            </Text>
            <b>%</b>
          </Text>
          <Text mb='10px'>
            Minimum:{' '}
            <Text component='span' data-cy='minimum-value' weight='bold'>
              {levels.minimum}
            </Text>
            <b>%</b>
          </Text>
        </Box>

        <Box mt='50px' display='flex'>
          <Button
            data-cy='close-modal-button'
            variant='outline'
            color='red'
            onClick={close}
            ml='auto'
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};
