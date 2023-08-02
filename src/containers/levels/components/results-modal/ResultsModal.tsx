import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

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
  const { isOpen, onClose } = disclosure;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='red.500' fontWeight='bold'>
            Luminaire light levels
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={3}>
            {description && (
              <Text mb={6} fontWeight='medium'>
                {description}
              </Text>
            )}

            <Text mb={2}>
              Occupied:{' '}
              <Text as='span' data-cy='occupied-value' fontWeight='bold'>
                {levels.occupied}
              </Text>
              <b>%</b>
            </Text>
            <Text mb={2}>
              Power save:{' '}
              <Text as='span' data-cy='power-save-value' fontWeight='bold'>
                {levels.powerSave}
              </Text>
              <b>%</b>
            </Text>
            <Text mb={2}>
              Minimum:{' '}
              <Text as='span' data-cy='minimum-value' fontWeight='bold'>
                {levels.minimum}
              </Text>
              <b>%</b>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              data-cy='close-modal-button'
              variant='outline'
              colorScheme='red'
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
