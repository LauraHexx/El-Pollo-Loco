class Chicken extends MoveableObject {
  offset = {
    top: 5,
    bottom: 5,
    left: 25,
    right: 15,
  };
  y = 350;
  width = 70;
  height = 75;

  imagesDead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  imagesWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 500 + Math.random() * 2700;
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDead);
    this.animate();
  }

  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
    setInterval(() => this.playChicken(), 100);
  }

  playChicken() {
    if (this.isDead()) {
      this.playAnimation(this.imagesDead);
    } else {
      this.playAnimation(this.imagesWalking);
    }
  }
}
