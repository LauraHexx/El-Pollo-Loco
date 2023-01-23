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
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

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

  drawImages(ctx) {
    // wird von world übergeben
    //von JS vordefinierte Funktion
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrames(ctx) {
    // wird von world übergeben
    if (this instanceof Character || this instanceof Chicken) {
      // wird nur ausgeführt wenn Character oder Chicken
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.y + this.height >= obj.y &&
      this.x < obj.x &&
      this.y < obj.y
    );
  }
  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  jump() {
    this.speedY = 25;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 150;
  }
}
