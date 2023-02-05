class ThrowableObject extends MoveableObject {
  width = 60;
  height = 80;
  speedY = 15;
  speedX = 10;
  acceleration = 2.5;
  imagesThrowing = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  imagesSplashing = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.imagesThrowing);
    this.loadImages(this.imagesSplashing);
    this.x = x;
    this.y = y;
    this.animate();
    this.throw();
  }

  animate() {
    setInterval(() => {
      if (this.y > 250) {
        this.playAnimation(this.imagesSplashing);
      } else {
        this.playAnimation(this.imagesThrowing);
      }
    }, 100);
  }

  throw() {
    this.applyGravity();
    setInterval(() => {
      this.x += this.speedX;
    }, 25);
  }
}
