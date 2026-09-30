(function (root) {
  'use strict';
  let context;
  let currentVoice;

  function makeVoice(audioContext) {
    const start = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();
    const volume = audioContext.createGain();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(520, start);
    oscillator.frequency.exponentialRampToValueAtTime(780, start + 0.10);
    oscillator.frequency.exponentialRampToValueAtTime(430, start + 0.32);
    oscillator.frequency.exponentialRampToValueAtTime(260, start + 0.55);
    filter.type = 'bandpass';
    filter.Q.value = 2.4;
    filter.frequency.setValueAtTime(1500, start);
    filter.frequency.exponentialRampToValueAtTime(2100, start + 0.12);
    filter.frequency.exponentialRampToValueAtTime(650, start + 0.53);
    volume.gain.setValueAtTime(0, start);
    volume.gain.linearRampToValueAtTime(0.12, start + 0.04);
    volume.gain.setValueAtTime(0.12, start + 0.18);
    volume.gain.exponentialRampToValueAtTime(0.001, start + 0.55);
    oscillator.connect(filter);
    filter.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.onended = () => {
      oscillator.disconnect();
      filter.disconnect();
      volume.disconnect();
      if (currentVoice === oscillator) currentVoice = undefined;
    };
    currentVoice = oscillator;
    oscillator.start(start);
    oscillator.stop(start + 0.57);
  }

  function play() {
    const AudioContext = root.AudioContext || root.webkitAudioContext;
    if (!AudioContext) return;
    try {
      context = context || new AudioContext();
      if (currentVoice) currentVoice.stop();
      // Resume directly during the gesture; scheduled nodes start once unlocked.
      if (context.state === 'suspended') context.resume().catch(() => {});
      makeVoice(context);
    } catch (error) {
      // Audio is optional: browser/device restrictions must not block the story.
      currentVoice = undefined;
    }
  }

  function status() {
    return context ? context.state : 'unavailable';
  }

  root.CatSound = Object.freeze({ play, status });
})(window);
