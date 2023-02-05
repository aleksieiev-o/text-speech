import React, { FC, ReactElement, useState } from 'react';
import ListHeader from '../../components/ListHeader';
import Header from '../../components/Header';
import { useCollectionsStore } from '../../store/hooks';
import { Collection } from '../../store/CollectionsStore';
import { observer } from 'mobx-react-lite';
import { Button, Card, CardBody, Heading, Icon, Stack, StackDivider, Text, useDisclosure } from '@chakra-ui/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CreateCollectionModal from '../../components/ListHeader/CreateCollection.modal';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../../components/ActionConfirmation.modal';

const CollectionsList: FC = observer((): ReactElement => {
  const collectionsStore = useCollectionsStore();
  const [tempCollection, setTempCollection] = useState<Collection>({} as Collection);
  const { isOpen: isOpenCreateCollectionModal, onOpen: onOpenCreateCollectionModal, onClose: onCloseCreateCollectionModal } = useDisclosure();
  const { isOpen: isOpenCRemoveCollectionModal, onOpen: onOpenCRemoveCollectionModal, onClose: onCloseRemoveCCollectionModal } = useDisclosure();

  const prepareToRemoveCollection = (collection: Collection) => {
    setTempCollection(collection);
    onOpenCRemoveCollectionModal();
  };

  const closeRemoveCollectionModalHandler = () => {
    onCloseRemoveCCollectionModal();
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
        <ListHeader
        onOpen={onOpenCreateCollectionModal}
        removeButtonHandler={collectionsStore.removeAllCollections}
        createButtonTitle={'Create collection'}
        removeButtonTitle={'Remove all collections'}/>

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
            overflow={'auto'}
            divider={<StackDivider/>}>
              {
                collectionsStore.collections.map((collection: Collection) => {
                  return <Card
                    key={collection.id}
                    as={'li'}
                    w={'full'}
                    title={collection.title}
                    cursor={'pointer'}
                    boxShadow={'md'}>
                    <CardBody>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Heading as={'h6'} mr={10} noOfLines={1}>
                          {collection.title}
                        </Heading>

                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                          <Button
                          leftIcon={<Icon as={EditIcon}/>}
                          colorScheme={'twitter'}
                          mr={4}>
                            Edit
                          </Button>

                          <Button
                          onClick={() => prepareToRemoveCollection(collection)}
                          colorScheme={'red'}
                          leftIcon={<Icon as={DeleteIcon}/>}>
                            Remove
                          </Button>
                        </Stack>
                      </Stack>
                    </CardBody>
                  </Card>;
                })
              }
            </Stack>
            :
            <Stack
            w={'full'}
            h={'full'}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}>
              <Text mb={4}>
                Collections list is empty
              </Text>

              <Button
              onClick={onOpenCreateCollectionModal}
              colorScheme={'facebook'}
              leftIcon={<Icon as={AddIcon}/>}>
                Create collection
              </Button>
            </Stack>
        }
      </Stack>

      {isOpenCreateCollectionModal && <CreateCollectionModal isOpen={isOpenCreateCollectionModal} onClose={onCloseCreateCollectionModal}/>}

      {
        isOpenCRemoveCollectionModal &&
        <ActionConfirmationModal
          actionHandler={actionRemoveCollectionModalHandler}
          isOpen={isOpenCRemoveCollectionModal}
          onClose={closeRemoveCollectionModalHandler}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove collection confirmation'}
          modalBodyDescription={`You are about to remove collection ${tempCollection.title}.`}
          modalBodyQuestion={'Are you cure?'}
          buttonText={'Remove'}/>
      }
    </>
  );
});

export default CollectionsList;
