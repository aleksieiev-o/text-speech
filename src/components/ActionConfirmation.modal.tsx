import React, { FC, ReactElement } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useLoading } from '../hooks/useLoading';

export enum ActionConfirmationModalType {
  INFO,
  WARNING,
  DANGER,
}

interface Props {
  modalType: ActionConfirmationModalType;
  modalTitle: string;
  modalBodyDescription: string;
  modalBodyQuestion: string;
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
  actionHandler: () => void | Promise<void>;
}

const ActionConfirmationModal: FC<Props> = observer((props): ReactElement => {
  const { modalType,  modalTitle, modalBodyDescription, modalBodyQuestion, buttonText, isOpen, onClose, actionHandler } = props;
  const { isLoading, setIsLoading } = useLoading();

  const buttonActionHandler = async () => {
    setIsLoading(true);

    try {
      await actionHandler();
    } finally {
      setIsLoading(false);
    }
  };

  const actionButtonColorScheme = {
    [ActionConfirmationModalType.INFO]: 'facebook',
    [ActionConfirmationModalType.WARNING]: 'orange',
    [ActionConfirmationModalType.DANGER]: 'red',
  }[modalType];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Stack>
            <Text>{modalBodyDescription}</Text>

            <StackDivider/>

            <Text as={'strong'}>{modalBodyQuestion}</Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={buttonActionHandler} isLoading={isLoading} colorScheme={actionButtonColorScheme} mr={4}>{buttonText}</Button>

          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ActionConfirmationModal;
