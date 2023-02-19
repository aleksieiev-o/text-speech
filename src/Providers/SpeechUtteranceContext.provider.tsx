import React, { createContext, FC, ReactElement, useEffect, useState } from 'react';

interface Props {
  children: ReactElement;
}

interface SpeechUtteranceContextState {
  voicesList: Array<SpeechSynthesisVoice>;
  isSpeaking: boolean;
  isPause: boolean;
  start: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

export const SpeechUtteranceContext = createContext<SpeechUtteranceContextState>({
  voicesList: [],
  isSpeaking: false,
  isPause: false,
  start: () => undefined,
  stop: () => undefined,
  pause: () => undefined,
  resume: () => undefined,
});

const SpeechUtteranceContextProvider: FC<Props> = ({ children }): ReactElement => {
  const speech: SpeechSynthesis = window.speechSynthesis;
  const [voicesList, setVoicesList] = useState<Array<SpeechSynthesisVoice>>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);

  useEffect(() => {
    speech.onvoiceschanged = () => {
      setVoicesList(speech.getVoices());
    };

    setVoicesList(speech.getVoices());
  }, []);

  const initializeHandlers = (utterance: SpeechSynthesisUtterance): void => {
    utterance.addEventListener('start', () => {
      console.warn('start');
      setIsSpeaking(true);
      setIsPause(false);
    });
    utterance.addEventListener('end', () => {
      console.warn('end');
      setIsSpeaking(false);
      setIsPause(false);
    });
    utterance.addEventListener('error', (err) => {
      console.warn('error', err, speech);
      setIsSpeaking(false);
      setIsPause(false);
    });
    utterance.addEventListener('pause', () => {
      console.warn('pause');
      setIsPause(true);
    });
    utterance.addEventListener('resume', () => {
      console.warn('resume');
      setIsPause(false);
    });
  };

  const stop = (): void => {
    speech.cancel();
  };

  const start = (text: string): void => {
    if (isSpeaking) {
      stop();
    }

    const utterance = new SpeechSynthesisUtterance();

    initializeHandlers(utterance);

    utterance.text = text;
    utterance.voice = voicesList[0];
    utterance.lang = 'de-DE';
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    speech.speak(utterance);
  };

  const pause = (): void => {
    speech.pause();
  };

  const resume = (): void => {
    speech.resume();
  };

  const themeContext: SpeechUtteranceContextState = {
    voicesList,
    start,
    stop,
    pause,
    resume,
    isSpeaking,
    isPause,
  };

  return (
    <SpeechUtteranceContext.Provider value={themeContext}>
      {children}
    </SpeechUtteranceContext.Provider>
  );
};

export default SpeechUtteranceContextProvider;
