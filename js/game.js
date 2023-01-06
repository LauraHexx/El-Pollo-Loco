let canvas;
let ctx;
let world;

function getId(id) {
  return document.getElementById(id);
}

function init() {
  canvas = getId("canvas");
  world = new World(canvas);

  console.log("Das ist meine Welt", world);
}
