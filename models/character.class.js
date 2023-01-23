class Character extends MoveableObject {
  y = 150;
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
  imagesJumping = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  speed = 10;
  world;
  walkingSound = new Audio("audio/walking.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png"); //Todo - brauch ich nicht mehr
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      //walk right
      this.walkingSound.pause();
      if (this.world.keyboard.right && this.x < world.currentLevel.levelEndX) {
        this.movingLeft = false;
        this.moveRight();
        this.walkingSound.play();
      }
      //walk left
      if (this.world.keyboard.left && this.x > 0) {
        this.movingLeft = true;
        this.moveLeft();
        this.walkingSound.play();
      }

      //jump
      if (this.world.keyboard.space && !this.isAboveGround()) {
        this.jump();
      }

      this.world.cameraX = -this.x + 80;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.imagesJumping);
      } else {
        if (this.world.keyboard.right || this.world.keyboard.left) {
          //walk animation
          this.playAnimation(this.imagesWalking);
        }
      }
    }, 100);
  }
}
