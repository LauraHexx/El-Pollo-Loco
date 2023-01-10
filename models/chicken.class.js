class Chicken extends MoveableObject {
  y = 357;
  width = 60;
  height = 80;
  imagesWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  walkingSound = new Audio("audio/chicken.mp3");

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 500
    this.speed = 0.15 + Math.random() * 0.35; // Zahl zwischen 200 und 500
    this.loadImages(this.imagesWalking);
    this.animate();
    this.playSound();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      this.playAnimation(this.imagesWalking);
    }, 100);
  }

  playSound() {
    //this.walkingSound.play(); // todo - bricht ab nach einmal spielen
  }
}
