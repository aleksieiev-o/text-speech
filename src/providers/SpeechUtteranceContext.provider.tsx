import React, { createContext, Dispatch, FC, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { Card } from '../store/CardsStore';

interface Props {
  children: ReactElement;
}

export enum PlayingStatus {
  STOPPED = 'STOPPED',
  SPEAKING = 'SPEAKING',
  PAUSED = 'PAUSED',
}

interface UseAppPlayingStatus {
  appPlayingStatus: PlayingStatus;
  setAppPlayingStatus: Dispatch<SetStateAction<PlayingStatus>>;
}

interface SpeechUtteranceContextState {
  voicesList: Array<SpeechSynthesisVoice>;
  appPlayingStatus: PlayingStatus;
  playingCardId: string;
  start: (payload: Card) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

const useAppPlayingStatus = (): UseAppPlayingStatus => {
  const [appPlayingStatus, setAppPlayingStatus] = useState<PlayingStatus>(PlayingStatus.STOPPED);

  return {
    appPlayingStatus,
    setAppPlayingStatus,
  };
};

export const SpeechUtteranceContext = createContext<SpeechUtteranceContextState>({
  voicesList: [],
  appPlayingStatus: PlayingStatus.STOPPED,
  playingCardId: '',
  start: () => undefined,
  stop: () => undefined,
  pause: () => undefined,
  resume: () => undefined,
});

const SpeechUtteranceContextProvider: FC<Props> = ({ children }): ReactElement => {
  const speech: SpeechSynthesis = window.speechSynthesis;
  const [voicesList, setVoicesList] = useState<Array<SpeechSynthesisVoice>>([]);
  const [ playingCardId, setPlayingCardId ] = useState<string>('');
  const { appPlayingStatus, setAppPlayingStatus } = useAppPlayingStatus();

  useEffect(() => {
    speech.onvoiceschanged = () => {
      setVoicesList(speech.getVoices());
    };

    setVoicesList(speech.getVoices());
  }, []);

  const initializeHandlers = (utterance: SpeechSynthesisUtterance): void => {
    // utterance.addEventListener('start', () => {});
    utterance.addEventListener('end', () => {
      setAppPlayingStatus(PlayingStatus.STOPPED);
      setPlayingCardId('');
    });
    // utterance.addEventListener('error', (err) => {});
    // utterance.addEventListener('pause', () => {});
    // utterance.addEventListener('resume', () => {});
  };

  const stop = (): void => {
    speech.cancel();
    setAppPlayingStatus(PlayingStatus.STOPPED);
    setPlayingCardId('');
  };

  const start = (card: Card): void => {
    const {text, textLang, voiceURI} = card;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const voice: SpeechSynthesisVoice = voicesList.find((voice) => voice.voiceURI === voiceURI)!;

    if (appPlayingStatus === PlayingStatus.SPEAKING || appPlayingStatus === PlayingStatus.PAUSED) {
      stop();
    }

    const utterance = new SpeechSynthesisUtterance();

    initializeHandlers(utterance);

    utterance.text = text;
    utterance.voice = voice;
    utterance.lang = textLang;
    utterance.volume = 1; // TODO add to Card
    utterance.rate = 1; // TODO add to Card
    utterance.pitch = 1; // TODO add to Card

    speech.speak(utterance);

    setAppPlayingStatus(PlayingStatus.SPEAKING);
    setPlayingCardId(card.id);
  };

  const pause = (): void => {
    speech.pause();
    setAppPlayingStatus(PlayingStatus.PAUSED);
  };

  const resume = (): void => {
    speech.resume();
    setAppPlayingStatus(PlayingStatus.SPEAKING);
  };

  const themeContext: SpeechUtteranceContextState = {
    voicesList,
    start,
    stop,
    pause,
    resume,
    appPlayingStatus,
    playingCardId,
  };

  return (
    <SpeechUtteranceContext.Provider value={themeContext}>
      {children}
    </SpeechUtteranceContext.Provider>
  );
};

export default SpeechUtteranceContextProvider;
