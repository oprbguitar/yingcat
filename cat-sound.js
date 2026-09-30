(function (root) {
  'use strict';
  let context;
  let currentVoice;
  let selectedCat = 'white';

  function makeVoice(audioContext, cat) {
    const start = audioContext.currentTime;
    const angry = cat === 'black';
    const duration = angry ? 0.85 : 0.55;
    const oscillator = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();
    const volume = audioContext.createGain();
    const vibrato = audioContext.createOscillator();
    const modulation = audioContext.createGain();
    const distortion = audioContext.createWaveShaper();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(angry ? 790 : 520, start);
    oscillator.frequency.exponentialRampToValueAtTime(angry ? 1250 : 780, start + 0.10);
    oscillator.frequency.exponentialRampToValueAtTime(angry ? 950 : 430, start + 0.32);
    oscillator.frequency.exponentialRampToValueAtTime(angry ? 480 : 260, start + duration);
    filter.type = 'bandpass';
    filter.Q.value = angry ? 1.3 : 2.4;
    filter.frequency.setValueAtTime(angry ? 2300 : 1500, start);
    filter.frequency.exponentialRampToValueAtTime(angry ? 3200 : 2100, start + 0.12);
    filter.frequency.exponentialRampToValueAtTime(angry ? 1100 : 650, start + duration);
    vibrato.frequency.value = angry ? 31 : 7;
    modulation.gain.value = angry ? 150 : 0;
    vibrato.connect(modulation);
    modulation.connect(oscillator.frequency);
    distortion.curve = angry ? Float32Array.from({ length: 256 }, (_, index) => Math.tanh((index * 2 / 255 - 1) * 3)) : null;
    distortion.oversample = '2x';
    volume.gain.setValueAtTime(0, start);
    volume.gain.linearRampToValueAtTime(angry ? 0.08 : 0.12, start + 0.04);
    volume.gain.setValueAtTime(angry ? 0.08 : 0.12, start + 0.18);
    volume.gain.exponentialRampToValueAtTime(0.001, start + duration);
    oscillator.connect(distortion);
    distortion.connect(filter);
    filter.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.onended = () => {
      vibrato.stop();
      oscillator.disconnect();
      vibrato.disconnect();
      modulation.disconnect();
      distortion.disconnect();
      filter.disconnect();
      volume.disconnect();
      if (currentVoice === oscillator) currentVoice = undefined;
    };
    currentVoice = oscillator;
    oscillator.start(start);
    vibrato.start(start);
    oscillator.stop(start + duration + 0.02);
    vibrato.stop(start + duration + 0.02);
  }

  function play(cat = 'white') {
    selectedCat = cat === 'black' ? 'black' : 'white';
    const AudioContext = root.AudioContext || root.webkitAudioContext;
    if (!AudioContext) return;
    try {
      context = context || new AudioContext();
      if (currentVoice) currentVoice.stop();
      // Resume directly during the gesture; scheduled nodes start once unlocked.
      if (context.state === 'suspended') context.resume().catch(() => {});
      makeVoice(context, selectedCat);
    } catch (error) {
      // Audio is optional: browser/device restrictions must not block the story.
      currentVoice = undefined;
    }
  }

  function status() {
    return context ? context.state : 'unavailable';
  }

  root.CatSound = Object.freeze({ play, status, lastCat: () => selectedCat });
})(window);
