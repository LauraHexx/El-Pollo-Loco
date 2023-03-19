let AUDIO_background = new Audio("/audio/background.mp3");
let AUDIO_bottleCollected = new Audio("/audio/bottleCollected.mp3");
let AUDIO_bottleSmashed = new Audio("/audio/bottleSmashed.mp3");
let AUDIO_characterJump = new Audio("audio/characterJump.mp3");
let AUDIO_characterHurt = new Audio("audio/characterHurt.mp3");
let AUDIO_characterSnore = new Audio("audio/characterSnore.mp3");
let AUDIO_characterThrow = new Audio("audio/characterThrow.mp3");
let AUDIO_characterWalk = new Audio("audio/characterWalk.mp3");
let AUDIO_coinCollected = new Audio("audio/coinCollected.mp3");
let AUDIO_unstoppable = new Audio("audio/unstoppable.mp3");
let AUDIO_chickenHit = new Audio("audio/chickenHit.mp3");
let AUDIO_endboss = new Audio("audio/endboss.mp3");
let AUDIO_gameLost = new Audio("audio/gameLost.mp3");
let AUDIO_gameWon = new Audio("audio/gameWon.mp3");

function playBackgroundAudio() {
  AUDIO_background.loop = true;
  AUDIO_background.volume = 0.4;
  AUDIO_background.play();
}

function playBottleCollectedAudio() {
  AUDIO_bottleCollected.loop = false;
  AUDIO_bottleCollected.volume = 0.4;
  AUDIO_bottleCollected.play();
}

function playBottleSmashedAudio() {
  AUDIO_bottleSmashed.loop = false;
  AUDIO_bottleSmashed.volume = 0.4;
  AUDIO_bottleSmashed.play();
}

function playCharacterJumpAudio() {
  AUDIO_characterJump.loop = false;
  AUDIO_characterJump.volume = 0.4;
  AUDIO_characterJump.play();
}

function playCharacterHurtAudio() {
  AUDIO_characterHurt.loop = false;
  AUDIO_characterHurt.volume = 0.4;
  AUDIO_characterHurt.play();
}

function playCharacterSnoreAudio() {
  AUDIO_characterSnore.loop = true;
  AUDIO_characterSnore.volume = 0.4;
  AUDIO_characterSnore.play();
}

function playCharacterThrowAudio() {
  AUDIO_characterThrow.loop = false;
  AUDIO_characterThrow.volume = 0.4;
  AUDIO_characterThrow.play();
}

function playCharacterWalkAudio() {
  AUDIO_characterWalk.loop = false;
  AUDIO_characterWalk.volume = 0.4;
  AUDIO_characterWalk.play();
}

function playCoinCollectedAudio() {
  AUDIO_coinCollected.loop = false;
  AUDIO_coinCollected.volume = 0.4;
  AUDIO_coinCollected.play();
}

function playUnstoppableAudio() {
  AUDIO_unstoppable.loop = false;
  AUDIO_unstoppable.volume = 0.4;
  AUDIO_unstoppable.play();
}

function playChickenHitAudio() {
  AUDIO_chickenHit.loop = false;
  AUDIO_chickenHit.volume = 0.4;
  AUDIO_chickenHit.play();
}

function playEndbossAudio() {
  AUDIO_endboss.loop = true;
  AUDIO_endboss.volume = 0.25;
  AUDIO_endboss.play();
}

function playGameLostAudio() {
  AUDIO_gameLost.loop = false;
  AUDIO_gameLost.volume = 0.4;
  AUDIO_gameLost.play();
}

function playGameWonAudio() {
  AUDIO_gameWon.loop = false;
  AUDIO_gameWon.volume = 0.4;
  AUDIO_gameWon.play();
}

function muteSounds() {
  AUDIO_background.muted = true;
  AUDIO_bottleCollected.muted = true;
  AUDIO_bottleSmashed.muted = true;
  AUDIO_characterJump.muted = true;
  AUDIO_characterHurt.muted = true;
  AUDIO_characterSnore.muted = true;
  AUDIO_characterThrow.muted = true;
  AUDIO_characterWalk.muted = true;
  AUDIO_coinCollected.muted = true;
  AUDIO_unstoppable.muted = true;
  AUDIO_chickenHit.muted = true;
  AUDIO_endboss.muted = true;
  AUDIO_gameLost.muted = true;
  AUDIO_gameWon.muted = true;

  let mute = getId("mute");
  mute.classList.add("d-none");

  let sound = getId("sound");
  sound.classList.remove("d-none");
}

function playSounds() {
  AUDIO_background.muted = false;
  AUDIO_bottleCollected.muted = false;
  AUDIO_bottleSmashed.muted = false;
  AUDIO_characterJump.muted = false;
  AUDIO_characterHurt.muted = false;
  AUDIO_characterSnore.muted = false;
  AUDIO_characterThrow.muted = false;
  AUDIO_characterWalk.muted = false;
  AUDIO_coinCollected.muted = false;
  AUDIO_unstoppable.false = true;
  AUDIO_chickenHit.muted = false;
  AUDIO_endboss.muted = false;
  AUDIO_gameLost.muted = false;
  AUDIO_gameWon.muted = false;

  let mute = getId("mute");
  mute.classList.remove("d-none");

  let sound = getId("sound");
  sound.classList.add("d-none");
}
