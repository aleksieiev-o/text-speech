import React, { FC, ReactElement, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCardsStore, useCollectionsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { Button, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../ActionConfirmation.modal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ProtectedRoutes } from '../../Router';
import { useCurrentCollectionId } from '../../hooks/useCurrentCollectionId';

interface Props {
  onOpen: () => void;
  removeButtonHandler: () => void;
}

const ListHeader: FC<Props> = observer((props): ReactElement => {
  const { onOpen } = props;
  const { isOpen, onOpen: onOpenConfirmModal, onClose } = useDisclosure();
  const collectionsStore = useCollectionsStore();
  const currentCollectionId = useCurrentCollectionId();
  const cardsStore = useCardsStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isCollectionsListPath = useMemo(() => pathname === ProtectedRoutes.COLLECTIONS, [pathname]);

  const removeAllItemsHandler = async () => {
    if (isCollectionsListPath) {
      await collectionsStore.removeAllCollections();
    } else {
      await cardsStore.removeAllCards(currentCollectionId);
    }
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
          !isCollectionsListPath &&
          <Button
            onClick={() => navigate(-1)}
            mr={'auto'}
            colorScheme={'gray'}
            variant={'outline'}
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
            variant={'outline'}
            leftIcon={<Icon as={AddIcon}/>}>
            {isCollectionsListPath ? 'Create collection' : 'Create card'}
          </Button>

          {(isCollectionsListPath ? collectionsStore.collections.length : cardsStore.cards.length) &&
            <Button
              onClick={onOpenConfirmModal}
              colorScheme={'red'}
              variant={'outline'}
              leftIcon={<Icon as={DeleteIcon}/>}>
              {isCollectionsListPath ? 'Remove all collections' : 'Remove all cards'}
            </Button>
          }
        </Stack>
      </Stack>

      {
        isOpen &&
        <ActionConfirmationModal
          actionHandler={removeAllItemsHandler}
          isOpen={isOpen}
          onClose={onClose}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={isCollectionsListPath ? 'Remove all collections confirmation' : 'Remove all cards confirmation'}
          modalBodyDescription={isCollectionsListPath ? 'You are about to remove all collection.' : 'You are about to remove all cards.'}
          modalBodyQuestion={'Are you cure?'}
          buttonText={'Remove'}/>
      }
    </>
  );
});

export default ListHeader;
