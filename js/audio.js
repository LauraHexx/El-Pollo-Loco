let AUDIO_background = new Audio("/audio/background.mp3");

let AUDIO_bottleCollected = new Audio("/audio/bottleCollected.mp3");
let AUDIO_bottleSplashed = new Audio("/audio/bottleSplashed.mp3");

let AUDIO_characterJump = new Audio("audio/characterJump.mp3");
let AUDIO_characterHurt = new Audio("audio/characterHurt.mp3");
let AUDIO_characterSnore = new Audio("audio/characterSnore.mp3");
let AUDIO_characterThrow = new Audio("audio/characterThrow.mp3");
let AUDIO_characterWalk = new Audio("audio/characterWalk.mp3");

let AUDIO_coinCollected = new Audio("audio/coinCollected.mp3");

let AUDIO_chickenDead = new Audio("audio/chickenDead.mp3");

let AUDIO_endboss = new Audio("audio/endboss.mp3");

let AUDIO_gameLost = new Audio("audio/gameLost.mp3");
let AUDIO_gameWon = new Audio("audio/gameWon.mp3");

function playBackgroundSound() {
  AUDIO_background.loop = true;
  AUDIO_background.volume = 0.4;
  AUDIO_background.play();
}

function playEndbossSound() {
  AUDIO_endboss.loop = true;
  AUDIO_endboss.volume = 0.4;
  AUDIO_endboss.play();
}

function playGameLostSound() {
  AUDIO_gameLost.loop = false;
  AUDIO_gameLost.volume = 0.4;
  AUDIO_gameLost.play();
}

function playGameWonSound() {
  AUDIO_gameWon.loop = false;
  AUDIO_gameWon.volume = 0.4;
  AUDIO_gameWon.play();
}

function muteSounds() {
  AUDIO_background.muted = true;

  let mute = getId("mute");
  mute.classList.add("d-none");

  let sound = getId("sound");
  sound.classList.remove("d-none");
}

function playSounds() {
  AUDIO_background.muted = false;

  let mute = getId("mute");
  mute.classList.remove("d-none");

  let sound = getId("sound");
  sound.classList.add("d-none");
}
