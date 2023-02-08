let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function getId(id) {
  return document.getElementById(id);
}

function init() {
  changeStlye();
  startGame();
}

function changeStlye() {
  let startscreen = getId("startscreen");
  startscreen.classList.add("d-none");
  let divPlayBtn = getId("divPlayBtn");
  divPlayBtn.classList.add("d-none");
}

function startGame() {
  canvas = getId("canvas");
  world = new World(canvas, keyboard);
  console.log("Das ist meine Welt", world);
}

function openHowToPlay() {
  let howtoPlay = getId("howtoPlay");
  howtoPlay.classList.remove("d-none");
}

function closeHowToPlay() {
  let howtoPlay = getId("howtoPlay");
  howtoPlay.classList.add("d-none");
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    //left
    keyboard.left = true;
  }
  if (event.keyCode == 39) {
    //right
    keyboard.right = true;
  }
  if (event.keyCode == 39) {
    //up
    keyboard.up = true;
  }
  if (event.keyCode == 39) {
    //down
    keyboard.down = true;
  }
  if (event.keyCode == 32) {
    //space
    keyboard.space = true;
  }
  if (event.keyCode == 13) {
    //enter
    keyboard.enter = true;
  }
  if (event.keyCode == 68) {
    //d
    keyboard.d = true;
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
  if (event.keyCode == 39) {
    //up
    keyboard.up = false;
  }
  if (event.keyCode == 39) {
    //down
    keyboard.down = false;
  }
  if (event.keyCode == 32) {
    //space
    keyboard.space = false;
  }
  if (event.keyCode == 13) {
    //enter
    keyboard.enter = false;
  }
  if (event.keyCode == 68) {
    //d
    keyboard.d = false;
  }
});
