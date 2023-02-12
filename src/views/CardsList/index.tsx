import React, { FC, ReactElement, useState } from 'react';
import Header from '../../components/Header';
import ListHeader from '../../components/ListHeader';
import { Button, CardBody, Heading, Icon, Link, Stack, StackDivider, Text, Card as ChakraCard, useDisclosure } from '@chakra-ui/react';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../../components/ActionConfirmation.modal';
import { Collection } from '../../store/CollectionsStore';
import { observer } from 'mobx-react-lite';
import { useCardsStore, useCollectionsStore } from '../../store/hooks';
import { Card } from '../../store/CardsStore';
import UpdateCardModal from '../../components/ListHeader/UpdateCard.modal';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const CardsList: FC = observer((): ReactElement => {
  const collectionsStore = useCollectionsStore();
  const cardStore = useCardsStore();
  const [tempCollection, setTempCollection] = useState<Collection>({} as Collection);
  const [tempCard, setTempCard] = useState<Card>({} as Card);
  const { isOpen: isOpenUpdateCardModal, onOpen: onOpenUpdateCardModal, onClose: onCloseUpdateCardModal } = useDisclosure();
  const { isOpen: isOpenRemoveCardModal, onOpen: onOpenCRemoveCardModal, onClose: onCloseRemoveCardModal } = useDisclosure();

  const prepareToRemoveCard = (collection: Card) => {
    setTempCard(collection);
    onOpenCRemoveCardModal();
  };

  const closeRemoveCardModalHandler = () => {
    onCloseRemoveCardModal();
    setTempCard({} as Card);
  };

  const actionRemoveCardModalHandler = async () => {
    await cardStore.removeCard(tempCard.id, tempCollection.id);
    closeRemoveCardModalHandler();
  };

  const removeAllCards = () => {
    // eslint-disable-next-line no-console
    console.log(111);
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
          onOpen={onOpenUpdateCardModal}
          removeButtonHandler={removeAllCards}/>

        {
          cardStore.cards.length ?
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
                cardStore.cards.map((collection: Card) => {
                  return <ChakraCard
                    key={collection.id}
                    as={'li'}
                    w={'full'}
                    title={collection.title}
                    cursor={'pointer'}
                    boxShadow={'md'}>
                    <CardBody>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Link as={RouterLink} to={collection.id}>
                          <Heading as={'h6'} mr={10} noOfLines={1}>
                            {collection.title}
                          </Heading>
                        </Link>

                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                          <Button
                            leftIcon={<Icon as={EditIcon}/>}
                            colorScheme={'twitter'}
                            variant={'outline'}
                            mr={4}>
                            Edit
                          </Button>

                          <Button
                            onClick={() => prepareToRemoveCard(collection)}
                            colorScheme={'red'}
                            variant={'outline'}
                            leftIcon={<Icon as={DeleteIcon}/>}>
                            Remove
                          </Button>
                        </Stack>
                      </Stack>
                    </CardBody>
                  </ChakraCard>;
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
                Cards list is empty
              </Text>

              <Button
                onClick={onOpenUpdateCardModal}
                colorScheme={'facebook'}
                variant={'outline'}
                leftIcon={<Icon as={AddIcon}/>}>
                Create card
              </Button>
            </Stack>
        }
      </Stack>

      {isOpenUpdateCardModal && <UpdateCardModal isOpen={isOpenUpdateCardModal} onClose={onCloseUpdateCardModal}/>}

      {
        isOpenRemoveCardModal &&
        <ActionConfirmationModal
          actionHandler={actionRemoveCardModalHandler}
          isOpen={isOpenRemoveCardModal}
          onClose={closeRemoveCardModalHandler}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove card confirmation'}
          modalBodyDescription={`You are about to remove card ${tempCard.title}.`}
          modalBodyQuestion={'Are you cure?'}
          buttonText={'Remove'}/>
      }
    </>
  );
});

export default CardsList;
