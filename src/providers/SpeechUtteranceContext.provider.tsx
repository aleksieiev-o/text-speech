import React, { createContext, Dispatch, FC, ReactElement, SetStateAction, useEffect, useState } from 'react';

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

export interface StartPlayingDto {
  id: string;
  text: string;
  lang: string;
}

interface SpeechUtteranceContextState {
  voicesList: Array<SpeechSynthesisVoice>;
  appPlayingStatus: PlayingStatus;
  playingCardId: string;
  start: (payload: StartPlayingDto) => void;
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

  const start = (payload: StartPlayingDto): void => {
    const {text, lang} = payload;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const voice: SpeechSynthesisVoice = voicesList.find((voice) => voice.lang === lang)!;

    if (appPlayingStatus === PlayingStatus.SPEAKING || appPlayingStatus === PlayingStatus.PAUSED) {
      stop();
    }

    const utterance = new SpeechSynthesisUtterance();

    initializeHandlers(utterance);

    utterance.text = text;
    utterance.voice = voice;
    utterance.lang = lang;
    utterance.volume = 1; // TODO add to StartPlayingDto
    utterance.rate = 1; // TODO add to StartPlayingDto
    utterance.pitch = 1; // TODO add to StartPlayingDto

    speech.speak(utterance);

    setAppPlayingStatus(PlayingStatus.SPEAKING);
    setPlayingCardId(payload.id);
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
