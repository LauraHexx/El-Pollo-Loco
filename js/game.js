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
  let mobileActionButtons = getId("mobileActionButtons");
  mobileActionButtons.classList.remove("d-none");
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

//KEYS

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

//ACTION BUTTONS

function checkIfButtonTouched() {
  document
    .getElementById("buttonLeft")
    .addEventListener("touchstart", (event) => {
      //left
      keyboard.left = true;
    });
  document
    .getElementById("buttonRight")
    .addEventListener("touchstart", (event) => {
      //left
      keyboard.right = true;
    });
  document
    .getElementById("buttonUp")
    .addEventListener("touchstart", (event) => {
      //left
      keyboard.up = true;
    });
  document
    .getElementById("buttonBottle")
    .addEventListener("touchstart", (event) => {
      //left
      keyboard.d = true;
    });
}

function checkIfButtonNotTouched() {
  document
    .getElementById("buttonLeft")
    .addEventListener("touchend", (event) => {
      //left
      keyboard.left = false;
    });
  document
    .getElementById("buttonRight")
    .addEventListener("touchend", (event) => {
      //left
      keyboard.right = false;
    });
  document.getElementById("buttonUp").addEventListener("touchend", (event) => {
    //left
    keyboard.up = false;
  });
  document
    .getElementById("buttonBottle")
    .addEventListener("touchend", (event) => {
      //left
      keyboard.d = false;
    });
}
