// VARIABLES

let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let howToPlayIsOpen = false;
let gameIsOver = false;
let isFullscreen = false;
let currentLevel = level1;

// GENERAL FUNCTIONS

function getId(id) {
  return document.getElementById(id);
}

// START

function init() {
  changeStlye();
  startGame();
  checkUseMobileButtons();
}

function changeStlye() {
  let startscreen = getId("startscreen");
  startscreen.classList.add("d-none");
  let divPlayBtn = getId("divPlayBtn");
  divPlayBtn.classList.add("d-none");
  let mobileActionButtons = getId("mobileActionButtons");
  mobileActionButtons.classList.replace("d-none", "showMobileActionBtns");
}

function startGame() {
  canvas = getId("canvas");
  world = new World(canvas, keyboard, currentLevel);
  console.log("Das ist meine Welt", world.currentLevel.enemies);
}

// MOBILE ACTION BUTTONS

function checkUseMobileButtons() {
  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    //e.preventDefault();
    keyboard.LEFT = true;
    document.getElementById("btnLeft").classList.add("filter-invert");
  });
  document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    //e.preventDefault();
    keyboard.LEFT = false;
    document.getElementById("btnLeft").classList.remove("filter-invert");
  });
  document.getElementById("btnRight").addEventListener("touchstart", (e) => {
    //e.preventDefault();
    keyboard.RIGHT = true;
    document.getElementById("btnRight").classList.add("filter-invert");
  });
  document.getElementById("btnRight").addEventListener("touchend", (e) => {
    //e.preventDefault();
    keyboard.RIGHT = false;
    document.getElementById("btnRight").classList.remove("filter-invert");
  });
  document.getElementById("btnnUp").addEventListener("touchstart", (e) => {
    //e.preventDefault();
    keyboard.UP = true;
    document.getElementById("btnnUp").classList.add("filter-invert");
  });
  document.getElementById("btnnUp").addEventListener("touchend", (e) => {
    //e.preventDefault();
    keyboard.UP = false;
    document.getElementById("btnnUp").classList.remove("filter-invert");
  });
  document.getElementById("btnBottle").addEventListener("touchstart", (e) => {
    //e.preventDefault();
    keyboard.SPACE = true;
    document.getElementById("btnBottle").classList.add("filter-invert");
  });
  document.getElementById("btnBottle").addEventListener("touchend", (e) => {
    //e.preventDefault();
    keyboard.SPACE = false;
    document.getElementById("btnBottle").classList.remove("filter-invert");
  });
}

// KEYS

window.addEventListener("keydown", (event) => {
  if (!gameIsOver) {
    if (event.keyCode == 37) {
      keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
      keyboard.RIGHT = true;
    }
    if (event.keyCode == 32) {
      keyboard.SPACE = true;
    }
    if (event.keyCode == 38) {
      keyboard.UP = true;
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
});

// WHEN USING ICONS AND BUTTONS

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

function toggleFullscreen() {
  if (isFullscreen) {
    closeFullscreen();
  } else {
    makeFullscreen();
  }
  isFullscreen = !isFullscreen;
}

function makeFullscreen() {
  let canvas = getId("canvas");
  canvas.classList.add("fullscreen");
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
    element.classList.add("noBorderRadius", "borderRadius");
  });
}

function backToStart() {
  location.reload();
}
