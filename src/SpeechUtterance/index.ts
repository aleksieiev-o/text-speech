class SpeechUtterance {
  private readonly speech: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance;
  private voices: Array<SpeechSynthesisVoice>;

  constructor() {
    this.speech = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();

    this.speech.onvoiceschanged = () => {
      this.voices = this.speech.getVoices();
    };

    this.voices = this.speech.getVoices();
  }

  start(text: string): void {
    if (this.isSpeaking) {
      this.stop();
    }

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

  get voicesList(): Array<SpeechSynthesisVoice> {
    return this.voices;
  }

  get isSpeaking(): boolean {
    return this.speech.speaking;
  }

  get isPaused(): boolean {
    return this.speech.paused;
  }

  private initializeHandlers(): void {
    this.utterance.addEventListener('start', () => {
      console.warn('start');
    });
    this.utterance.addEventListener('end', () => {
      console.warn('end');
    });
    this.utterance.addEventListener('error', (err) => {
      console.warn('error', err, this.speech);
    });
    this.utterance.addEventListener('pause', () => {
      console.warn('pause');
    });
    this.utterance.addEventListener('resume', () => {
      console.warn('resume');
    });
  }
}

export const speechUtterance = new SpeechUtterance();
