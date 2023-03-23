const audioCache = [];
const audios = [
  { name: "background", src: "audio/background.mp3", loop: true, volume: 0.4 },
  {
    name: "bottleCollected",
    src: "audio/bottleCollected.mp3",
    loop: false,
    volume: 0.4,
  },
  {
    name: "bottleSmashed",
    src: "audio/bottleSmashed.mp3",
    loop: false,
    volume: 0.4,
  },
  {
    name: "characterJump",
    src: "audio/characterJump.mp3",
    loop: false,
    volume: 0.4,
  },
  {
    name: "characterHurt",
    src: "audio/characterHurt.mp3",
    loop: false,
    volume: 0.4,
  },
  {
    name: "characterSnore",
    src: "audio/characterSnore.mp3",
    loop: false,
    volume: 0.4,
  },
  {
    name: "characterThrow",
    src: "audio/characterThrow.mp3",
    loop: false,
    volume: 0.4,
  },
  {
    name: "characterWalk",
    src: "audio/characterWalk.mp3",
    loop: false,
    volume: 0.4,
  },
  {
    name: "coinCollected",
    src: "audio/coinCollected.mp3",
    loop: false,
    volume: 0.4,
  },
  {
    name: "unstoppable",
    src: "audio/unstoppable.mp3",
    loop: false,
    volume: 0.4,
  },
  { name: "chickenHit", src: "audio/chickenHit.mp3", loop: false, volume: 0.4 },
  { name: "endboss", src: "audio/endboss.mp3", loop: true, volume: 0.2 },
  { name: "gameLost", src: "audio/gameLost.mp3", loop: false, volume: 0.4 },
  { name: "gameWon", src: "audio/gameWon.mp3", loop: false, volume: 0.4 },
];

function generateAudios() {
  audios.forEach((audio) => {
    const audioElement = new Audio(audio.src);
    audioElement.loop = audio.loop;
    audioElement.volume = audio.volume;
    audioCache[audio.name] = audioElement;
  });
  console.log(audioCache);
}

function playAudio(key) {
  const selectedAudio = audioCache[key];
  selectedAudio.play();
}

function pauseAudio(key) {
  const selectedAudio = audioCache[key];
  selectedAudio.pause();
}

function toggleMute() {
  if (isMuted) {
    unmuteAudios();
  } else {
    muteAudios();
  }
  isMuted = !isMuted;
}

function muteAudios() {
  for (const key in audioCache) {
    audioCache[key].muted = true;
  }
  document.getElementById("muteOrAudio").src = "img/icons/sound.png";
}

function unmuteAudios() {
  for (const key in audioCache) {
    audioCache[key].muted = false;
  }
  document.getElementById("muteOrAudio").src = "img/icons/mute.png";
}
