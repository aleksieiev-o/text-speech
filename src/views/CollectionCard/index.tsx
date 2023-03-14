import React, { FC, ReactElement, useMemo, useState } from 'react';
import Header from '../../components/Header';
import { Box, Button, Card, CardBody, CardHeader, Container, Heading, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCardsStore, useSettingsStore } from '../../store/hooks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CollectionCard: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cardStore = useCardsStore();
  const settingsStore = useSettingsStore();
  const [cardTextVisible, setCardTextVisible] = useState<boolean>(settingsStore.hidePreviewText);

  const currentCardId = pathname.split('/')[3];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentCard = useMemo(() => cardStore.currentCardsList.find((item) => item.id === currentCardId)!, [cardStore.currentCardsList]);

  const transformDate = (dateRaw: string): string => {
    const date = new Date(dateRaw);
    return new Intl.DateTimeFormat(settingsStore.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).format(date);
  };

  return (
    <>
      <Header/>

      <Stack w={'full'} h={'full'} direction={'column'} alignItems={'center'} justifyContent={'center'} overflowY={'auto'}>
        <Stack w={'full'} boxShadow={'md'} mb={4} p={4}>
          <Button
            onClick={() => navigate(-1)}
            mr={'auto'}
            colorScheme={'gray'}
            variant={'outline'}
            leftIcon={<Icon as={ArrowBackIosIcon}/>}>
            Back
          </Button>
        </Stack>

        <Container centerContent={true} w={'full'} h={'full'} maxW={'6xl'} p={4}>
          <Stack w={'full'} h={'full'} alignItems={'center'} justifyContent={{ md: 'center', base: 'flex-start'}}>
            <Card maxW={'2xl'} boxShadow={'lg'} overflow={'hidden'}>
              <CardHeader boxShadow={'xs'}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={4}>
                  <Heading as={'h5'} noOfLines={1} fontSize={{ md: 24, base: 18 }}>
                    {currentCard.title || 'No title'}
                  </Heading>

                  {/*<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                    <IconButton
                      onClick={() => prepareToEditCard(currentCard)}
                      colorScheme={'telegram'}
                      aria-label={'Edit card'}
                      title={'Edit card'}
                      icon={<Icon as={EditIcon}/>}
                      variant={'outline'}/>

                    <IconButton
                      onClick={() => prepareToRemoveCard(currentCard)}
                      colorScheme={'red'}
                      aria-label={'Delete card'}
                      title={'Delete card'}
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
                        Text
                      </Heading>

                      <IconButton
                        onClick={() => setCardTextVisible(!cardTextVisible)}
                        colorScheme={'telegram'}
                        size={'xs'}
                        aria-label={cardTextVisible ? 'Show text' : 'Hide text'}
                        title={cardTextVisible ? 'Show text' : 'Hide text'}
                        icon={<Icon as={cardTextVisible ? VisibilityIcon : VisibilityOffIcon}/>}
                        variant={'outline'}/>
                    </Stack>

                    <Text
                      overflow={'hidden'}
                      pt={2}
                      color={cardTextVisible ?  'transparent' : ''}
                      textShadow={cardTextVisible ?  '#000 0 0 7px' : ''}>
                      {currentCard.text || 'No text'}
                    </Text>
                  </Box>

                  <Box>
                    <Heading as={'h6'} fontSize={{ md: 18, base: 16 }}>
                      Created date
                    </Heading>

                    <Text pt={2}>
                      {transformDate(currentCard.createdDate)}
                    </Text>
                  </Box>

                  <Box>
                    <Heading as={'h6'} fontSize={{ md: 18, base: 16 }}>
                      Updated date
                    </Heading>

                    <Text pt={2}>
                      {transformDate(currentCard.updatedDate)}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default CollectionCard;
