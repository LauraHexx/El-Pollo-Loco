class Chicken extends MoveableObject {
  offset = {
    top: 5,
    bottom: 5,
    left: 25,
    right: 15,
  };
  y = 345;
  width = 90;
  height = 80;

  imagesWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  imagesDead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  walkingSound = new Audio("audio/chicken.mp3"); //todo

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 500 + Math.random() * 2700;
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDead);
    this.animate();
    this.playSound();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
        setTimeout(() => {
          this.x = 0;
          this.y = 0;
          this.width = 0;
          this.height = 0;
        }, 100);
      } else {
        this.playAnimation(this.imagesWalking);
      }
    }, 100);
  }

  playSound() {
    //this.walkingSound.play(); // todo - bricht ab nach einmal spielen
  }
}
