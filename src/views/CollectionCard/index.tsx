import React, { FC, ReactElement, useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Box, Card, CardBody, CardHeader, Container, Heading, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useCardsStore, useSettingsStore } from '../../store/hooks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { ProtectedRoutes } from '../../Router';
import ButtonBack from '../../components/ButtonBack';
import { observer } from 'mobx-react-lite';

const CollectionCard: FC = observer((): ReactElement => {
  const { pathname } = useLocation();
  const cardsStore = useCardsStore();
  const settingsStore = useSettingsStore();
  const [cardTextVisible, setCardTextVisible] = useState<boolean>(settingsStore.hidePreviewText);
  const { t } = useTranslation(['common']);

  const currentCollectionId = pathname.split('/')[2];
  const currentCardId = pathname.split('/')[3];

  const loadCurrentCard = async () => {
    await cardsStore.loadCardById(currentCardId, currentCollectionId);
  };

  useEffect(() => {
    loadCurrentCard();
  }, []);

  const transformDate = (dateRaw: string): string => {
    if (dateRaw) {
      const date = new Date(dateRaw);
      return new Intl.DateTimeFormat(settingsStore.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).format(date);
    }
    return '';
  };

  return (
    <>
      <Header/>

      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Stack w={'full'} h={'full'} direction={'column'} alignItems={'center'} justifyContent={'center'} overflowY={'auto'}>
        <Stack w={'full'} boxShadow={'md'} mb={4} p={4}>
          <ButtonBack to={`/collections/${currentCollectionId}` as ProtectedRoutes.COLLECTIONS}/>
        </Stack>

        <Container centerContent={true} w={'full'} h={'full'} maxW={'3xl'} p={4}>
          <Stack w={'full'} h={'full'} alignItems={'center'} justifyContent={{ md: 'center', base: 'flex-start'}}>
            <Card maxW={'2xl'} boxShadow={'lg'} overflow={'hidden'}>
              <CardHeader boxShadow={'xs'}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={4}>
                  <Heading as={'h5'} noOfLines={1} fontSize={{ md: 24, base: 18 }}>
                    {cardsStore.currentCard.title}
                  </Heading>

                  {/*<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                    <IconButton
                      onClick={() => prepareToEditCard(cardsStore.currentCard)}
                      colorScheme={'telegram'}
                      aria-label={'Edit card'}
                      title={t('card_edit_btn_title', { ns: 'card' })!}
                      icon={<Icon as={EditIcon}/>}
                      variant={'outline'}/>

                    <IconButton
                      onClick={() => prepareToRemoveCard(cardsStore.currentCard)}
                      colorScheme={'red'}
                      aria-label={'Remove card'}
                      title={t('card_remove_btn_title', { ns: 'card' })!}
                      variant={'outline'}
                      icon={<Icon as={DeleteIcon}/>}/>
                  </Stack>*/}
                </Stack>
              </CardHeader>

              <CardBody>
                <Stack w={'full'} h={'full'} alignItems={'flex-start'} justifyContent={'center'} spacing={4}>
                  <Box>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={2}>
                      <Heading as={'h6'} fontSize={{ md: 18, base: 16 }}>
                        {t('common_input_text_label')}
                      </Heading>

                      <IconButton
                        onClick={() => setCardTextVisible(!cardTextVisible)}
                        colorScheme={'telegram'}
                        size={'xs'}
                        aria-label={cardTextVisible ? 'Show text' : 'Hide text'}
                        title={cardTextVisible ? t('card_show_text_btn_title', { ns: 'card' })! : t('card_hide_text_btn_title', { ns: 'card' })!}
                        icon={<Icon as={cardTextVisible ? VisibilityIcon : VisibilityOffIcon}/>}
                        variant={'outline'}/>
                    </Stack>

                    <Text
                      overflow={'hidden'}
                      pt={2}
                      color={cardTextVisible ?  'transparent' : ''}
                      textShadow={cardTextVisible ?  '#000 0 0 7px' : ''}>
                      {cardsStore.currentCard.text}
                    </Text>
                  </Box>

                  <Box>
                    <Heading as={'h6'} fontSize={{ md: 18, base: 16 }}>
                      {t('card_created_date', { ns: 'card' })}
                    </Heading>

                    <Text pt={2}>
                      {transformDate(cardsStore.currentCard.createdDate)}
                    </Text>
                  </Box>

                  <Box>
                    <Heading as={'h6'} fontSize={{ md: 18, base: 16 }}>
                      {t('card_updated_date', { ns: 'card' })}
                    </Heading>

                    <Text pt={2}>
                      {transformDate(cardsStore.currentCard.updatedDate)}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </Container>
      </Stack>
      {/* eslint-enable */}
    </>
  );
});

export default CollectionCard;
