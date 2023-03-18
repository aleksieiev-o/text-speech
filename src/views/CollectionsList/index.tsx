import React, { FC, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListHeader from '../../components/ListHeader';
import Header from '../../components/Header';
import { useCollectionsStore } from '../../store/hooks';
import { Collection } from '../../store/CollectionsStore';
import { observer } from 'mobx-react-lite';
import { Card, CardBody, Heading, Icon, IconButton, Link, Stack, StackDivider, useDisclosure } from '@chakra-ui/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateCollectionModal from '../../components/ListHeader/UpdateCollection.modal';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../../components/ActionConfirmation.modal';
import EmptyList from '../EmptyList';
import { useTranslation } from 'react-i18next';

const CollectionsList: FC = observer((): ReactElement => {
  const collectionsStore = useCollectionsStore();
  const [tempCollection, setTempCollection] = useState<Collection>({} as Collection);
  const { isOpen: isOpenUpdateCollectionModal, onOpen: onOpenUpdateCollectionModal, onClose: onCloseUpdateCollectionModal } = useDisclosure();
  const { isOpen: isOpenRemoveCollectionModal, onOpen: onOpenRemoveCollectionModal, onClose: onCloseRemoveCollectionModal } = useDisclosure();
  const { t } = useTranslation(['common', 'collectionsList']);

  const prepareToEditCollection = (collection: Collection) => {
    setTempCollection(collection);
    onOpenUpdateCollectionModal();
  };

  const closeUpdateCollectionModalHandler = () => {
    onCloseUpdateCollectionModal();
    setTempCollection({} as Collection);
  };

  const prepareToRemoveCollection = (collection: Collection) => {
    setTempCollection(collection);
    onOpenRemoveCollectionModal();
  };

  const closeRemoveCollectionModalHandler = () => {
    onCloseRemoveCollectionModal();
    setTempCollection({} as Collection);
  };

  const actionRemoveCollectionModalHandler = async () => {
    await collectionsStore.removeCollection(tempCollection.id);
    closeRemoveCollectionModalHandler();
  };

  return (
    <>
      <Header/>

      <Stack
      as={'section'}
      direction={'column'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      h={'full'}
      overflow={'hidden'}>
        {collectionsStore.collections.length &&
          <ListHeader
          onOpen={onOpenUpdateCollectionModal}
          removeButtonHandler={collectionsStore.removeAllCollections}/>
        }

        {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
        {
          collectionsStore.collections.length ?
            <Stack
            as={'ul'}
            direction={'column'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            w={'full'}
            h={'full'}
            p={4}
            overflowY={'auto'}
            divider={<StackDivider/>}>
              {
                collectionsStore.collections.map((collection: Collection) => {
                  return <Card
                    key={collection.id}
                    as={'li'}
                    w={'full'}
                    title={collection.title}
                    cursor={'default'}
                    boxShadow={'md'}>
                    <CardBody>
                      <Stack
                        direction={{ md: 'row', base: 'column' }}
                        alignItems={{ md: 'center', base: 'flex-start' }}
                        justifyContent={'space-between'}
                        spacing={4}>
                        <Link as={RouterLink} to={collection.id}>
                          <Heading as={'h5'} noOfLines={1} fontSize={{ md: 24, base: 18 }}>
                            {collection.title}
                          </Heading>
                        </Link>

                        <Stack
                          direction={'row'}
                          w={{ md: 'auto', base: 'full' }}
                          alignItems={'center'}
                          justifyContent={{ md: 'space-between', base: 'flex-end' }}
                          spacing={2}>
                          <IconButton
                          onClick={() => prepareToEditCollection(collection)}
                          colorScheme={'telegram'}
                          aria-label={'Edit collection'}
                          title={t('collections_list_edit_btn_title', { ns: 'collectionsList' })!}
                          variant={'outline'}
                          icon={<Icon as={EditIcon}/>}/>

                          <IconButton
                          onClick={() => prepareToRemoveCollection(collection)}
                          colorScheme={'red'}
                          aria-label={'Remove collection'}
                          title={t('collections_list_remove_btn_title', { ns: 'collectionsList' })!}
                          variant={'outline'}
                          icon={<Icon as={DeleteIcon}/>}/>
                        </Stack>
                      </Stack>
                    </CardBody>
                  </Card>;
                })
              }
            </Stack>
            :
            <EmptyList
            emptyListMessage={t('collections_list_empty_list', { ns: 'collectionsList' })}
            buttonHandler={onOpenUpdateCollectionModal}
            buttonText={t('collections_list_create_btn', { ns: 'collectionsList' })}
            buttonIcon={AddIcon}/>
        }
      </Stack>

      {isOpenUpdateCollectionModal &&
        <UpdateCollectionModal
          currentCollection={tempCollection}
          isOpen={isOpenUpdateCollectionModal}
          onClose={closeUpdateCollectionModalHandler}/>}

      {
        isOpenRemoveCollectionModal &&
        <ActionConfirmationModal
          actionHandler={actionRemoveCollectionModalHandler}
          isOpen={isOpenRemoveCollectionModal}
          onClose={closeRemoveCollectionModalHandler}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={t('collections_list_remove_confirm_message', { ns: 'collectionsList' })}
          modalBodyDescription={`${t('collections_list_remove_confirm_message', { ns: 'collectionsList' })}${tempCollection.title}.`}
          modalBodyQuestion={t('common_confirm_question')!}
          buttonText={t('common_remove_btn')}/>
      }
      {/* eslint-enable */}
    </>
  );
});

export default CollectionsList;
