class SpeechUtterance {
  private readonly speech: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance;
  private voices: Array<SpeechSynthesisVoice>;

  constructor() {
    this.speech = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();

    this.speech.onvoiceschanged = () => {
      this.voices = this.speech.getVoices();
      // eslint-disable-next-line no-console
      // console.log(111, this.voices);
    };

    this.voices = this.speech.getVoices();
  }

  start(text: string): void {
    this.utterance = new SpeechSynthesisUtterance();

    this.initializeHandlers();

    this.utterance.text = text;
    this.utterance.voice = this.voices[0];
    this.utterance.lang = 'de-DE';
    this.utterance.volume = 1;
    this.utterance.rate = 1;
    this.utterance.pitch = 1;

    this.speech.speak(this.utterance);
  }

  stop(): void {
    this.speech.cancel();
  }

  pause(): void {
    this.speech.pause();
  }

  resume(): void {
    this.speech.resume();
  }

  get getVoices(): Array<SpeechSynthesisVoice> {
    return this.voices;
  }

  private initializeHandlers(): void {
    this.utterance.onstart = () => {
      console.warn('onstart');
    };
    this.utterance.onend = () => {
      console.warn('onend');
    };
    this.utterance.onerror = (err) => {
      console.warn('onerror', err);
    };
    this.utterance.onpause = () => {
      console.warn('onpause');
    };
    this.utterance.onresume = () => {
      console.warn('onresume');
    };
    this.utterance.onmark = () => {
      console.warn('onmark');
    };
  }
}

export const speechUtterance = new SpeechUtterance();
