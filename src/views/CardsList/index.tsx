import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
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
import { SpeechUtteranceContext } from '../../providers/SpeechUtteranceContext.provider';
import { useTranslation } from 'react-i18next';

const CardsList: FC = observer((): ReactElement => {
  const cardsStore = useCardsStore();
  const currentCollectionId = useCurrentCollectionId();
  const [tempCard, setTempCard] = useState<Card>({} as Card);
  const { stop } = useContext(SpeechUtteranceContext);
  const { isOpen: isOpenUpdateCardModal, onOpen: onOpenUpdateCardModal, onClose: onCloseUpdateCardModal } = useDisclosure();
  const { isOpen: isOpenRemoveCardModal, onOpen: onOpenCRemoveCardModal, onClose: onCloseRemoveCardModal } = useDisclosure();
  const { t } = useTranslation(['common', 'cardsList']);

  const loadCardList = async () => {
    await cardsStore.loadAllCards(currentCollectionId);
  };

  useEffect(() => {
    loadCardList();

    return () => {
      stop();
    };
  }, []);

  const prepareToEditCard = (card: Card) => {
    setTempCard(card);
    onOpenUpdateCardModal();
  };

  const closeEditCardModalHandler = () => {
    onCloseUpdateCardModal();
    setTempCard({} as Card);
  };

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

        {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
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
                    prepareToEditCard={prepareToEditCard}
                    prepareToRemoveCard={prepareToRemoveCard}
                    card={card}/>;
                })
              }
            </Stack>
            :
            <EmptyList
            emptyListMessage={t('cards_list_empty_list', {ns: 'cardsList' })}
            buttonHandler={onOpenUpdateCardModal}
            buttonText={t('cards_list_create_btn', {ns: 'cardsList' })}
            buttonIcon={AddIcon}/>
        }
      </Stack>

      {isOpenUpdateCardModal && <UpdateCardModal
        currentCard={tempCard}
        isOpen={isOpenUpdateCardModal}
        onClose={closeEditCardModalHandler}/>}

      {
        isOpenRemoveCardModal &&
        <ActionConfirmationModal
          actionHandler={actionRemoveCardModalHandler}
          isOpen={isOpenRemoveCardModal}
          onClose={closeRemoveCardModalHandler}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={t('cards_list_remove_confirm_title', {ns: 'cardsList' })}
          modalBodyDescription={`${t('cards_list_remove_confirm_message', {ns: 'cardsList' })}${tempCard.title}.`}
          modalBodyQuestion={t('common_confirm_question')!}
          buttonText={t('common_remove_btn')}/>
      }
      {/* eslint-enable */}
    </>
  );
});

export default CardsList;
