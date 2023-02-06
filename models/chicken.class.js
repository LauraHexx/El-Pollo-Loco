class Chicken extends MoveableObject {
  offset = {
    top: 5,
    bottom: 5,
    left: 0,
    right: 0,
  };
  y = 357;
  width = 60;
  height = 80;
  imagesWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  walkingSound = new Audio("audio/chicken.mp3"); //todo

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 380 + Math.random() * 500; // Zahl zwischen 200 und 500
    this.speed = 0.15 + Math.random() * 0.35; // Zahl zwischen 200 und 500
    this.loadImages(this.imagesWalking);
    this.animate();
    this.playSound();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.imagesWalking);
    }, 100);
  }

  playSound() {
    //this.walkingSound.play(); // todo - bricht ab nach einmal spielen
  }
}
