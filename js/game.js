let canvas;
let ctx;
let world;
let howToPlayIsOpen = false;
let gameIsOver = false;
let currentLevel = level1;

function getId(id) {
  return document.getElementById(id);
}

function init() {
  changeStlye();
  startGame();
  playBackgroundAudio();
}

function changeStlye() {
  let startscreen = getId("startscreen");
  startscreen.classList.add("d-none");
  let divPlayBtn = getId("divPlayBtn");
  divPlayBtn.classList.add("d-none");
  let fullscreenIcon = getId("fullscreenIcon");
  fullscreenIcon.classList.remove("d-none");
  let mobileActionButtons = getId("mobileActionButtons");
  mobileActionButtons.classList.remove("d-none");
}

function startGame() {
  canvas = getId("canvas");
  world = new World(canvas, currentLevel);
  console.log("Das ist meine Welt", world);
}

function openHowToPlay() {
  let howtoPlay = getId("howtoPlay");
  howtoPlay.classList.remove("d-none");
  howToPlayIsOpen = true;
}

function closeHowToPlay() {
  let howtoPlay = getId("howtoPlay");
  howtoPlay.classList.add("d-none");
  howToPlayIsOpen = false;
}

function makeFullscreen() {
  let content = getId("content");

  enterFullscreen(content);
}

function enterFullscreen(content) {
  if (content.requestFullscreen) {
    content.requestFullscreen();
  } else if (content.msRequestFullscreen) {
    content.msRequestFullscreen();
  } else if (content.webkitRequestFullscreen) {
    content.webkitRequestFullscreen();
  }
}

function backToStart() {
  location.reload();
}
