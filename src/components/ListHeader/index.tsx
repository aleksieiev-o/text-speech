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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['common', 'collectionsList', 'cardsList']);

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
        {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
        {
          !isCollectionsListPath &&
          <Button
            onClick={() => navigate(-1)}
            mr={'auto'}
            colorScheme={'gray'}
            variant={'outline'}
            title={t('common_back_btn')!}
            leftIcon={<Icon as={ArrowBackIosIcon}/>}>
            {t('common_back_btn')}
          </Button>
        }

        {(isCollectionsListPath ? collectionsStore.collections.length : cardsStore.currentCardsList.length) &&
          <Stack
          direction={'row'}
          w={'full'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
            <Button
              onClick={onOpen}
              colorScheme={'telegram'}
              variant={'outline'}
              leftIcon={<Icon as={AddIcon}/>}>
              {isCollectionsListPath
                ? t('collections_list_create_btn', { ns: 'collectionsList' })
                : t('cards_list_create_btn', { ns: 'cardsList' })}
            </Button>

            <Button
              onClick={onOpenConfirmModal}
              colorScheme={'red'}
              variant={'outline'}
              leftIcon={<Icon as={DeleteIcon}/>}>
              {isCollectionsListPath
                ? t('collections_list_remove_all_btn', { ns: 'collectionsList' })
                : t('cards_list_remove_all_btn', { ns: 'cardsList' })}
            </Button>
        </Stack>}
      </Stack>

      {
        isOpen &&
        <ActionConfirmationModal
          actionHandler={removeAllItemsHandler}
          isOpen={isOpen}
          onClose={onClose}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={isCollectionsListPath
            ? t('collections_list_remove_all_confirm_title', { ns: 'collectionsList' })!
            : t('cards_list_remove_all_confirm_title', { ns: 'cardsList' })!}
          modalBodyDescription={isCollectionsListPath
            ? t('collections_list_remove_all_confirm_message', { ns: 'collectionsList' })!
            : t('cards_list_remove_all_confirm_message', { ns: 'cardsList' })!}
          modalBodyQuestion={t('common_confirm_question')!}
          buttonText={t('common_remove_btn')}/>
      }
      {/* eslint-enable */}
    </>
  );
});

export default ListHeader;
