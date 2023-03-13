let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
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

window.addEventListener("keydown", (event) => {
  if (!gameIsOver) {
    if (event.keyCode == 37) {
      // LEFT
      keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
      // RIGHT
      keyboard.RIGHT = true;
    }
    if (event.keyCode == 32) {
      // SPACE
      keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
      // d
      keyboard.D = true;
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 37) {
    // LEFT
    keyboard.LEFT = false;
  }
  if (event.keyCode == 39) {
    // RIGHT
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 32) {
    // SPACE
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    // d
    keyboard.D = false;
  }
});

// ACTION BUTTONS
function checkIfButtonTouched() {
  document
    .getElementById("buttonLeft")
    .addEventListener("touchstart", (event) => {
      // LEFT
      keyboard.LEFT = true;
    });
  document
    .getElementById("buttonRight")
    .addEventListener("touchstart", (event) => {
      // RIGHT
      keyboard.RIGHT = true;
    });
  document
    .getElementById("buttonUp")
    .addEventListener("touchstart", (event) => {
      // SPACE
      keyboard.SPACE = true;
    });
  document
    .getElementById("buttonBottle")
    .addEventListener("touchstart", (event) => {
      // d
      keyboard.D = true;
    });
}

function checkIfButtonNotTouched() {
  document
    .getElementById("buttonLeft")
    .addEventListener("touchend", (event) => {
      // LEFT
      keyboard.LEFT = false;
    });
  document
    .getElementById("buttonRight")
    .addEventListener("touchend", (event) => {
      // RIGHT
      keyboard.RIGHT = false;
    });
  document.getElementById("buttonUp").addEventListener("touchend", (event) => {
    // SPACE
    keyboard.SPACE = false;
  });
  document
    .getElementById("buttonBottle")
    .addEventListener("touchend", (event) => {
      // d
      keyboard.D = false;
    });
}
