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
  mobileButtons();
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
  console.log("Das ist meine Welt", world.currentLevel.enemies);
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
    if (event.keyCode == 38) {
      // d
      keyboard.UP = true;
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
  if (event.keyCode == 38) {
    // d
    keyboard.UP = false;
  }
});

// ACTION BUTTONS

function mobileButtons() {
  document.getElementById("buttonLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
    document.getElementById("buttonLeft").classList.add("filter-invert");
  });

  document.getElementById("buttonLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
    document.getElementById("buttonLeft").classList.remove("filter-invert");
  });

  document.getElementById("buttonRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
    document.getElementById("buttonRight").classList.add("filter-invert");
  });

  document.getElementById("buttonRight").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
    document.getElementById("buttonRight").classList.remove("filter-invert");
  });

  document.getElementById("buttonUp").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
    document.getElementById("buttonUp").classList.add("filter-invert");
  });

  document.getElementById("buttonUp").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
    document.getElementById("buttonUp").classList.remove("filter-invert");
  });

  document
    .getElementById("buttonBottle")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
      document.getElementById("buttonBottle").classList.add("filter-invert");
    });

  document.getElementById("buttonBottle").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
    document.getElementById("buttonBottle").classList.remove("filter-invert");
  });
}
