class MoveableObject {
  img;
  x = 120;
  y = 250;
  width = 130;
  height = 170;
  imageCache = {};
  curentImage = 0;
  speed = 0.25;
  movingLeft = false;

  constructor() {}

  loadImage(path) {
    //erstellt ein img html tag
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.curentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.curentImage++;
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
