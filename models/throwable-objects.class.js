class ThrowableObject extends MoveableObject {
  x = 150;
  y = 100;
  width = 60;
  height = 80;
  speedY = 15;
  speedX = 7;
  acceleration = 2.5;
  imagesThrowing = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(path) {
    super().loadImage(path);
    this.throw(170, 200);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.applyGravity();
    setInterval(() => {
      this.x += this.speedX;
    }, 25);
  }
}
