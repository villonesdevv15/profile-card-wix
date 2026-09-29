"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // entrance animations
  document.body.classList.add("is-loaded");

  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const seek = document.getElementById("seek");

  const ICONS = {
    play: "M17.29 9.02c.96.54.96 1.42 0 1.96L1.74 19.78C.78 20.33 0 19.87 0 18.76V1.24C0 .13.78-.32 1.74.22l15.55 8.8z",
    pause: "M2 0h4v20H2zM12 0h4v20h-4z"
  };

  function setPlaying(isPlaying) {
    playBtn.setAttribute("aria-pressed", String(isPlaying));
    playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    playIcon.setAttribute("d", isPlaying ? ICONS.pause : ICONS.play);
  }

  playBtn.addEventListener("click", () => {
    if (!audio.src) return;
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("ended", () => { setPlaying(false); seek.value = 0; });

  audio.addEventListener("loadedmetadata", () => {
    seek.max = audio.duration || 100;
  });

  audio.addEventListener("timeupdate", () => {
    seek.value = audio.currentTime;
  });

  seek.addEventListener("input", () => {
    audio.currentTime = Number(seek.value);
  });
});
