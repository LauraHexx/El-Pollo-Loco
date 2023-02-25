let AUDIO_background = new Audio("./audio/background.mp3");

let AUDIO_bottle = new Audio("./audio/bottle.mp3");

let AUDIO_characterJump = new Audio("audio/characterJump.mp3");
let AUDIO_characterJumpSmall = new Audio("audio/characterJumpSmall.mp3");
let AUDIO_characterHurt = new Audio("audio/characterHurt.mp3");
let AUDIO_characterSnor = new Audio("audio/characterSnore.mp3");
let AUDIO_characterThrow = new Audio("audio/characterThrow.mp3");
let AUDIO_characterWalk = new Audio("audio/characterWalk.mp3");
let AUDIO_coin = new Audio("audio/coin.mp3");

let AUDIO_chickenDead = new Audio("audio/chickenDead.mp3");

function playBackgroundSound() {
  AUDIO_background.loop = true;
  AUDIO_background.volume = 0.4;
  AUDIO_background.play();
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
