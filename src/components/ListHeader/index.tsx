import React, { FC, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCollectionsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { Button, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../ActionConfirmation.modal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ProtectedRoutes } from '../../Router';

interface Props {
  onOpen: () => void;
  createButtonTitle: string;
  removeButtonTitle: string;
  removeButtonHandler: () => void;
}

const ListHeader: FC<Props> = observer((props): ReactElement => {
  const {createButtonTitle, removeButtonTitle, onOpen} = props;
  const { isOpen, onOpen: onOpenConfirmModal, onClose } = useDisclosure();
  const collectionsStore = useCollectionsStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const removeAllCollectionsHandler = async () => {
    await collectionsStore.removeAllCollections();
    onClose();
  };

  return (
    <>
      <Stack
        as={'section'}
        direction={'row'}
        w={'full'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        mb={4}
        p={4}
        boxShadow={'md'}>
        {
          pathname !== ProtectedRoutes.COLLECTIONS &&
          <Button
            onClick={() => navigate(-1)}
            mr={'auto'}
            colorScheme={'blackAlpha'}
            leftIcon={<Icon as={ArrowBackIosIcon}/>}>
            Back
          </Button>
        }

        <Stack
          direction={'row'}
          w={'full'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <Button
            onClick={onOpen}
            colorScheme={'facebook'}
            leftIcon={<Icon as={AddIcon}/>}>
            {createButtonTitle}
          </Button>

          <Button
            onClick={onOpenConfirmModal}
            colorScheme={'red'}
            leftIcon={<Icon as={DeleteIcon}/>}>
            {removeButtonTitle}
          </Button>
        </Stack>
      </Stack>

      {
        isOpen &&
        <ActionConfirmationModal
          actionHandler={removeAllCollectionsHandler}
          isOpen={isOpen}
          onClose={onClose}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove all collections confirmation'}
          modalBodyDescription={'You are about to remove all collection.'}
          modalBodyQuestion={'Are you cure?'}
          buttonText={'Remove'}/>
      }
    </>
  );
});

export default ListHeader;
