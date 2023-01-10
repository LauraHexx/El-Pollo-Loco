class Character extends MoveableObject {
  y = 165;
  width = 130;
  height = 280;
  imagesWalking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  speed = 7;
  world;
  walkingSound = new Audio("audio/walking.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png"); //Todo - brauch ich nicht mehr
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      //walk right
      this.walkingSound.pause();
      if (this.world.keyboard.right && this.x < world.currentLevel.levelEndX) {
        this.x += this.speed;
        this.movingLeft = false;
        this.walkingSound.play();
      }
      //walk left
      if (this.world.keyboard.left && this.x > 0) {
        this.x -= this.speed;
        this.movingLeft = true;
        this.walkingSound.play();
      }
      this.world.cameraX = -this.x + 80;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.right || this.world.keyboard.left) {
        //walk animation
        let i = this.curentImage % this.imagesWalking.length;
        let path = this.imagesWalking[i];
        this.img = this.imageCache[path];
        this.curentImage++;
      }
    }, 100);
  }

  jump() {}
}
