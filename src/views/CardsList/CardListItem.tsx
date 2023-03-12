import React, { FC, ReactElement, useContext, useMemo } from 'react';
import { Card as ChakraCard, CardBody, Heading, Icon, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card } from '../../store/CardsStore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PlayingStatus, SpeechUtteranceContext, StartPlayingDto } from '../../providers/SpeechUtteranceContext.provider';

interface Props {
  card: Card;
  prepareToRemoveCard: (card: Card) => void;
}

const CardListItem: FC<Props> = (props): ReactElement => {
  const { card, prepareToRemoveCard } = props;
  const { start, stop, pause, resume, appPlayingStatus, playingCardId } = useContext(SpeechUtteranceContext);

  const isSpeaking = useMemo(() => playingCardId === card.id && appPlayingStatus === PlayingStatus.SPEAKING, [appPlayingStatus, playingCardId]);
  const isPaused = useMemo(() => playingCardId === card.id && appPlayingStatus === PlayingStatus.PAUSED, [appPlayingStatus, playingCardId]);
  const isStopBtnDisabled = useMemo(() => playingCardId === card.id && appPlayingStatus !== PlayingStatus.STOPPED, [appPlayingStatus, playingCardId]);

  const playControlButtonProps = useMemo((): { title: string, ariaLabel: string, icon: ReactElement } => {
    if (isSpeaking) {
      return {
        title: 'Pause',
        ariaLabel: 'Pause',
        icon: <Icon as={PauseIcon}/>,
      };
    } else if (isPaused) {
      return {
        title: 'Resume',
        ariaLabel: 'Resume',
        icon: <Icon as={PlayArrowIcon}/>,
      };
    }
    return {
      title: 'Play',
      ariaLabel: 'Play',
      icon: <Icon as={PlayArrowIcon}/>,
    };
  }, [appPlayingStatus, playingCardId]);

  const playControlHandler = (payload: StartPlayingDto): void => {
    if (isSpeaking && !isPaused && playingCardId === payload.id) {
      pause();
    } else if (!isSpeaking && isPaused && playingCardId === payload.id) {
      resume();
    } else {
      start(payload);
    }
  };

  const stopPlaying = (): void => {
    stop();
  };

  return (
    <ChakraCard
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
                onClick={() => playControlHandler({ id: card.id, text: card.text, lang: card.textLang })}
                colorScheme={'telegram'}
                aria-label={playControlButtonProps.ariaLabel}
                title={playControlButtonProps.title}
                icon={playControlButtonProps.icon}
                variant={'outline'}/>

              <IconButton
                onClick={() => stopPlaying()}
                colorScheme={'telegram'}
                aria-label={'Stop'}
                title={'Stop'}
                icon={<Icon as={StopIcon}/>}
                isDisabled={!isStopBtnDisabled}
                variant={'outline'}/>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
              <IconButton
                colorScheme={'telegram'}
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
    </ChakraCard>
  );
};

export default CardListItem;
