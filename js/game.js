let canvas;
let ctx;
let world;
let howToPlayIsOpen = false;
let keyboard = new Keyboard();
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
}

function startGame() {
  canvas = getId("canvas");
  world = new World(canvas, keyboard, currentLevel);
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
  //
}

function backToStart() {
  location.reload();
}

window.addEventListener("keydown", (event) => {
  if (!gameIsOver) {
    if (event.keyCode == 37) {
      //left
      keyboard.left = true;
    }
    if (event.keyCode == 39) {
      //right
      keyboard.right = true;
    }
    if (event.keyCode == 32) {
      //space
      keyboard.space = true;
    }
    if (event.keyCode == 68) {
      //d
      keyboard.d = true;
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 37) {
    //left
    keyboard.left = false;
  }
  if (event.keyCode == 39) {
    //right
    keyboard.right = false;
  }
  if (event.keyCode == 32) {
    //space
    keyboard.space = false;
  }
  if (event.keyCode == 68) {
    //d
    keyboard.d = false;
  }
});
