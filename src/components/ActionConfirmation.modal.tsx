import React, { FC, ReactElement } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useLoading } from '../hooks/useLoading';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['common']);

  const buttonActionHandler = async () => {
    setIsLoading(true);

    try {
      await actionHandler();
    } finally {
      setIsLoading(false);
    }
  };

  const actionButtonColorScheme = {
    [ActionConfirmationModalType.INFO]: 'telegram',
    [ActionConfirmationModalType.WARNING]: 'orange',
    [ActionConfirmationModalType.DANGER]: 'red',
  }[modalType];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
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
          <Button
            onClick={buttonActionHandler}
            isLoading={isLoading}
            colorScheme={actionButtonColorScheme}
            variant={'outline'}
            title={buttonText}
            mr={4}>
            {buttonText}
          </Button>

          <Button onClick={onClose} colorScheme={'gray'} variant={'outline'} title={t('common_close_btn')!}>
            {t('common_close_btn')}
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* eslint-enable */}
    </Modal>
  );
});

export default ActionConfirmationModal;
