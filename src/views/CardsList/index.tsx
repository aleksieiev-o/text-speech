import React, { FC, ReactElement, useEffect, useState } from 'react';
import Header from '../../components/Header';
import ListHeader from '../../components/ListHeader';
import { CardBody, Heading, Icon, Link, Stack, Text, Card as ChakraCard, useDisclosure, IconButton, StackDivider } from '@chakra-ui/react';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../../components/ActionConfirmation.modal';
import { observer } from 'mobx-react-lite';
import { useCardsStore } from '../../store/hooks';
import { Card } from '../../store/CardsStore';
import UpdateCardModal from '../../components/ListHeader/UpdateCard.modal';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useCurrentCollectionId } from '../../hooks/useCurrentCollectionId';
import EmptyList from '../EmptyList';

const CardsList: FC = observer((): ReactElement => {
  const cardsStore = useCardsStore();
  const currentCollectionId = useCurrentCollectionId();
  const [tempCard, setTempCard] = useState<Card>({} as Card);
  const { isOpen: isOpenUpdateCardModal, onOpen: onOpenUpdateCardModal, onClose: onCloseUpdateCardModal } = useDisclosure();
  const { isOpen: isOpenRemoveCardModal, onOpen: onOpenCRemoveCardModal, onClose: onCloseRemoveCardModal } = useDisclosure();

  const loadCardList = async () => {
    await cardsStore.loadAllCards(currentCollectionId);
  };

  useEffect(() => {
    loadCardList();
  }, []);

  const prepareToRemoveCard = (card: Card) => {
    setTempCard(card);
    onOpenCRemoveCardModal();
  };

  const closeRemoveCardModalHandler = () => {
    onCloseRemoveCardModal();
    setTempCard({} as Card);
  };

  const actionRemoveCardModalHandler = async () => {
    await cardsStore.removeCard(tempCard.id, currentCollectionId);
    closeRemoveCardModalHandler();
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
        removeButtonHandler={() => cardsStore.removeAllCards(currentCollectionId)}/>

        {
          cardsStore.currentCardsListSize ?
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
                cardsStore.currentCardsList.map((card: Card) => {
                  return <ChakraCard
                    key={card.id}
                    as={'li'}
                    w={'full'}
                    title={card.title}
                    cursor={'default'}
                    boxShadow={'md'}>
                    <CardBody>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        overflow={'hidden'}
                        h={'full'}
                        spacing={4}>
                        <Stack direction={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} spacing={2}>
                          <Link as={RouterLink} to={card.id}>
                            <Heading as={'h6'} noOfLines={1}>
                              {card.title || 'No title'}
                            </Heading>
                          </Link>

                          <Text overflow={'hidden'} maxH={'72px'}>
                            {card.text || 'No text'}
                          </Text>
                        </Stack>

                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={6}>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                            <IconButton
                              colorScheme={'twitter'}
                              aria-label={'Play'}
                              title={'Play'}
                              icon={<Icon as={PlayArrowIcon}/>}
                              variant={'outline'}/>

                            <IconButton
                              colorScheme={'twitter'}
                              aria-label={'Stop'}
                              title={'Stop'}
                              icon={<Icon as={StopIcon}/>}
                              variant={'outline'}/>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                            <IconButton
                              colorScheme={'twitter'}
                              aria-label={'Edit card'}
                              title={'Edit card'}
                              icon={<Icon as={EditIcon}/>}
                              variant={'outline'}/>

                            <IconButton
                              onClick={() => prepareToRemoveCard(card)}
                              colorScheme={'red'}
                              aria-label={'Delete card'}
                              title={'Delete card'}
                              variant={'outline'}
                              icon={<Icon as={DeleteIcon}/>}/>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardBody>
                  </ChakraCard>;
                })
              }
            </Stack>
            :
            <EmptyList
            emptyListMessage={'Cards list is empty'}
            buttonHandler={onOpenUpdateCardModal}
            buttonText={'Create card'}
            buttonIcon={AddIcon}/>
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
