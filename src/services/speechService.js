let currentUtterance = null;
let isPaused = false;
let currentSpeed = 1;
let currentLang = 'en-IN';
let currentVoiceId = null;
let onStateChangeCallback = null;

const FEMALE_VOICE_KEYWORDS = ['female', 'samantha', 'victoria', 'karen', 'moira', 'zira', 'hazel', 'ava', 'susan', 'kate', 'alice', 'nora', 'emma', 'sarah'];

function findBestVoice(voices, lang, preferFemale = true) {
  const primaryLang = lang.split('-')[0];

  const exactFemale = voices.find(v =>
    v.lang === lang && FEMALE_VOICE_KEYWORDS.some(k => v.name.toLowerCase().includes(k))
  );
  if (exactFemale) return exactFemale;

  const anyExact = voices.find(v => v.lang === lang);
  if (anyExact && !preferFemale) return anyExact;

  const langFemale = voices.find(v =>
    v.lang.startsWith(primaryLang) && FEMALE_VOICE_KEYWORDS.some(k => v.name.toLowerCase().includes(k))
  );
  if (langFemale) return langFemale;

  const anyLang = voices.find(v => v.lang.startsWith(primaryLang));
  if (anyLang) return anyLang;

  return voices[0];
}

export function setOnStateChange(callback) {
  onStateChangeCallback = callback;
}

function notifyStateChange() {
  if (onStateChangeCallback) {
    onStateChangeCallback(getState());
  }
}

export function speak(text, speed = 1, lang = 'en-IN') {
  stop();

  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  currentSpeed = speed;
  currentLang = lang;
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.rate = speed;
  currentUtterance.pitch = lang === 'hi-IN' ? 1.1 : 1.15;
  currentUtterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const voice = findBestVoice(voices, lang, true);

  if (voice) {
    currentUtterance.voice = voice;
    currentUtterance.lang = voice.lang || lang;
    currentVoiceId = voice.name;
  } else {
    currentUtterance.lang = lang;
    currentVoiceId = null;
  }

  currentUtterance.onend = () => {
    currentUtterance = null;
    isPaused = false;
    notifyStateChange();
  };

  currentUtterance.onerror = () => {
    currentUtterance = null;
    isPaused = false;
    notifyStateChange();
  };

  window.speechSynthesis.speak(currentUtterance);
  isPaused = false;
  notifyStateChange();
}

export function speakHindi(text, speed = 1) {
  speak(text, speed, 'hi-IN');
}

export function pause() {
  if (window.speechSynthesis.speaking && !isPaused) {
    window.speechSynthesis.pause();
    isPaused = true;
    notifyStateChange();
  }
}

export function resume() {
  if (isPaused) {
    window.speechSynthesis.resume();
    isPaused = false;
    notifyStateChange();
  }
}

export function stop() {
  window.speechSynthesis.cancel();
  currentUtterance = null;
  isPaused = false;
  notifyStateChange();
}

export function togglePlayPause(text, speed, lang) {
  if (isSpeaking() && !isPaused) {
    pause();
  } else if (isPaused) {
    resume();
  } else {
    speak(text, speed || currentSpeed, lang || currentLang);
  }
}

export function setSpeed(speed) {
  currentSpeed = speed;
  if (currentUtterance) {
    const text = currentUtterance.text;
    const lang = currentUtterance.lang || currentLang;
    stop();
    speak(text, speed, lang);
  }
}

export function setLanguage(lang) {
  currentLang = lang;
  if (currentUtterance) {
    const text = currentUtterance.text;
    const speed = currentSpeed;
    stop();
    speak(text, speed, lang);
  }
}

export function isSpeaking() {
  return window.speechSynthesis.speaking;
}

export function isPausedState() {
  return isPaused;
}

export function getState() {
  return {
    isSpeaking: window.speechSynthesis.speaking,
    isPaused,
    speed: currentSpeed,
    lang: currentLang,
    voiceName: currentVoiceId,
  };
}

export function getAvailableVoices() {
  return window.speechSynthesis.getVoices();
}

export function getCurrentLanguage() {
  return currentLang;
}

// Load voices (they load asynchronously in some browsers)
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    // Voices are now available
  };
}

export const LANGUAGES = [
  { value: 'en-IN', label: '🇮🇳 English (Indian)' },
  { value: 'hi-IN', label: '🇮🇳 हिन्दी' },
];

export const SPEED_OPTIONS = [
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1, label: '1x' },
  { value: 1.5, label: '1.5x' },
  { value: 2, label: '2x' },
];
