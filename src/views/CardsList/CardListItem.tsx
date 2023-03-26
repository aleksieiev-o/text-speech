import React, { FC, ReactElement, useContext, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card as ChakraCard, CardBody, Heading, Icon, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Card } from '../../store/CardsStore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PlayingStatus, SpeechUtteranceContext, StartPlayingDto } from '../../providers/SpeechUtteranceContext.provider';
import { useSettingsStore } from '../../store/hooks';
import { useTranslation } from 'react-i18next';

interface Props {
  card: Card;
  prepareToEditCard: (card: Card) => void;
  prepareToRemoveCard: (card: Card) => void;
}

const CardListItem: FC<Props> = (props): ReactElement => {
  const { card, prepareToEditCard, prepareToRemoveCard } = props;
  const { start, stop, pause, resume, appPlayingStatus, playingCardId } = useContext(SpeechUtteranceContext);
  const settingsStore = useSettingsStore();
  const [cardTextVisible, setCardTextVisible] = useState<boolean>(settingsStore.hidePreviewText);
  const { t } = useTranslation(['card']);

  const isSpeaking = useMemo(() => playingCardId === card.id && appPlayingStatus === PlayingStatus.SPEAKING, [appPlayingStatus, playingCardId]);
  const isPaused = useMemo(() => playingCardId === card.id && appPlayingStatus === PlayingStatus.PAUSED, [appPlayingStatus, playingCardId]);
  const isStopBtnDisabled = useMemo(() => playingCardId === card.id && appPlayingStatus !== PlayingStatus.STOPPED, [appPlayingStatus, playingCardId]);

  const playControlButtonProps = useMemo((): { title: string, ariaLabel: string, icon: ReactElement } => {
    if (isSpeaking) {
      return {
        title: t('card_pause_btn_title', { ns: 'card' }),
        ariaLabel: 'Pause',
        icon: <Icon as={PauseIcon}/>,
      };
    } else if (isPaused) {
      return {
        title: t('card_resume_btn_title', { ns: 'card' }),
        ariaLabel: 'Resume',
        icon: <Icon as={PlayArrowIcon}/>,
      };
    }
    return {
      title: t('card_play_btn_title', { ns: 'card' }),
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
          direction={{ md: 'row', base: 'column' }}
          alignItems={{ md: 'center', base: 'flex-start' }}
          justifyContent={'space-between'}
          overflow={'hidden'}
          h={'full'}
          spacing={4}>
          <Stack direction={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} spacing={2}>
            <Link as={RouterLink} to={card.id}>
              <Heading as={'h5'} noOfLines={1} lineHeight={'normal'} fontSize={{ md: 24, base: 18 }}>
                {card.title}
              </Heading>
            </Link>

            <Text
              overflow={'hidden'}
              maxH={'72px'}
              color={cardTextVisible ?  'transparent' : ''}
              textShadow={cardTextVisible ?  '#000 0 0 7px' : ''}>
              {card.text}
            </Text>
          </Stack>

          {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
          <Stack w={{ md: 'auto', base: 'full' }} direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={6}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2} mr={{ md: '', base: 'auto' }}>
              <IconButton
                onClick={() => setCardTextVisible(!cardTextVisible)}
                colorScheme={'telegram'}
                title={cardTextVisible ? t('card_show_text_btn_title', { ns: 'card' })! : t('card_hide_text_btn_title', { ns: 'card' })!}
                aria-label={cardTextVisible ? 'Show text' : 'Hide text'}
                icon={<Icon as={cardTextVisible ? VisibilityIcon : VisibilityOffIcon}/>}
                variant={'outline'}/>
            </Stack>

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
                title={t('card_stop_btn_title', { ns: 'card' })!}
                aria-label={'Stop'}
                icon={<Icon as={StopIcon}/>}
                isDisabled={!isStopBtnDisabled}
                variant={'outline'}/>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
              <IconButton
                onClick={() => prepareToEditCard(card)}
                colorScheme={'telegram'}
                aria-label={'Edit card'}
                title={t('card_edit_btn_title', { ns: 'card' })!}
                icon={<Icon as={EditIcon}/>}
                variant={'outline'}/>

              <IconButton
                onClick={() => prepareToRemoveCard(card)}
                colorScheme={'red'}
                aria-label={'Remove card'}
                title={t('card_remove_btn_title', { ns: 'card' })!}
                variant={'outline'}
                icon={<Icon as={DeleteIcon}/>}/>
            </Stack>
          </Stack>
          {/* eslint-enable */}
        </Stack>
      </CardBody>
    </ChakraCard>
  );
};

export default CardListItem;
