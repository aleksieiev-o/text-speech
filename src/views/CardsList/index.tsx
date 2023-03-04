import React, { FC, ReactElement, useEffect, useState } from 'react';
import Header from '../../components/Header';
import ListHeader from '../../components/ListHeader';
import { Stack, useDisclosure, StackDivider } from '@chakra-ui/react';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../../components/ActionConfirmation.modal';
import { observer } from 'mobx-react-lite';
import { useCardsStore } from '../../store/hooks';
import { Card } from '../../store/CardsStore';
import UpdateCardModal from '../../components/ListHeader/UpdateCard.modal';
import AddIcon from '@mui/icons-material/Add';
import { useCurrentCollectionId } from '../../hooks/useCurrentCollectionId';
import EmptyList from '../EmptyList';
import CardListItem from './CardListItem';

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
                  return <CardListItem
                    key={card.id}
                    prepareToRemoveCard={prepareToRemoveCard}
                    card={card}/>;
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
