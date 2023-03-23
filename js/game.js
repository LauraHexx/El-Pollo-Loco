// VARIABLES

let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;
let currentLevel = level1;
let intervalIds = [];
let howToPlayIsOpen = false;
let isMuted = false;
let gameIsOver = false;

// GENERAL FUNCTIONS

function getId(id) {
  return document.getElementById(id);
}

// START

function init() {
  generateAudios();
  startGame();
  changeStyle();
}

function changeStyle() {
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("divPlayBtn").classList.add("d-none");
  document.getElementById("howtoPlayIcon").classList.add("d-none");
  document
    .getElementById("mobileActionButtons")
    .classList.replace("d-none", "showMobileActionBtns");
}

function startGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, currentLevel);
  startIntervale();
}

function startIntervale() {
  intervalIds.forEach((id) => {
    setInterval(id);
  });
}

function stopIntervale() {
  intervalIds.forEach((id) => {
    clearInterval(id);
  });
}

function toggleHowToPlay() {
  if (howToPlayIsOpen) {
    closeHowToPlay();
  } else {
    openHowToPlay();
  }
  howToPlayIsOpen = !howToPlayIsOpen;
}

function openHowToPlay() {
  document.getElementById("howtoPlay").classList.remove("d-none");
}

function closeHowToPlay() {
  document.getElementById("howtoPlay").classList.add("d-none");
}

function toggleFullscreen() {
  if (isFullscreen) {
    closeFullscreen();
  } else {
    makeFullscreen();
  }
  isFullscreen = !isFullscreen;
}

function makeFullscreen() {
  document.getElementById("canvas").classList.add("fullscreen");
  const borderRadiusElements = document.querySelectorAll(".borderRadius");
  borderRadiusElements.forEach((element) => {
    element.classList.replace("borderRadius", "noBorderRadius");
  });
}

function closeFullscreen() {
  let canvas = getId("canvas");
  canvas.classList.remove("fullscreen");
  const borderRadiusElements = document.querySelectorAll(".noBorderRadius");
  borderRadiusElements.forEach((element) => {
    element.classList.replace("noBorderRadius", "borderRadius");
  });
}

function backToStart() {
  location.reload();
}
