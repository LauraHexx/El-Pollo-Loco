class MoveableObject {
  x = 120;
  y = 250;
  img;
  width = 130;
  height = 170;

  constructor() {}

  loadImage(path) {
    //erstellt ein img html tag
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {}

  moveLeft() {}
}
