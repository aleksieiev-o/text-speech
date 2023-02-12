import React, { FC, ReactElement, useEffect, useState } from 'react';
import Header from '../../components/Header';
import ListHeader from '../../components/ListHeader';
import { CardBody, Heading, Icon, Link, Stack, Text, Card as ChakraCard, useDisclosure, Grid, GridItem, IconButton } from '@chakra-ui/react';
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
          cardsStore.cards.length ?
            <Grid as={'ul'} templateColumns={'repeat(3, 1fr)'} gap={4} p={4} w={'full'} overflowY={'auto'}>
              {
                cardsStore.cards.map((card: Card) => {
                  return <GridItem
                    key={card.id}
                    as={'li'}
                    overflow={'hidden'}
                    boxShadow={'md'}
                    minH={'220px'}>
                    <ChakraCard
                    title={card.title}
                    cursor={'default'}
                    h={'full'}>
                      <CardBody>
                        <Stack
                          direction={'column'}
                          alignItems={'flex-start'}
                          justifyContent={'space-between'}
                          overflow={'hidden'}
                          h={'full'}>
                          <Stack direction={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} spacing={4} mb={6}>
                            <Link as={RouterLink} to={card.id}>
                              <Heading as={'h6'} mr={10} noOfLines={1}>
                                {card.title}
                              </Heading>
                            </Link>

                            <Text h={'48px'} maxH={'48px'} overflow={'hidden'}>
                              {card.text}
                            </Text>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={4} w={'full'}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                              <IconButton
                                colorScheme={'twitter'}
                                aria-label={'Play'}
                                title={'Play'}
                                icon={<Icon as={PlayArrowIcon}/>}
                                variant={'outline'}
                                mr={4}/>

                              <IconButton
                                colorScheme={'twitter'}
                                aria-label={'Stop'}
                                title={'Stop'}
                                icon={<Icon as={StopIcon}/>}
                                variant={'outline'}
                                mr={4}/>
                            </Stack>

                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                              <IconButton
                                colorScheme={'twitter'}
                                aria-label={'Edit card'}
                                title={'Edit card'}
                                icon={<Icon as={EditIcon}/>}
                                variant={'outline'}
                                mr={4}/>

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
                    </ChakraCard>
                  </GridItem>;
                })
              }
            </Grid>
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
