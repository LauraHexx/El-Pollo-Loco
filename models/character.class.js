class Character extends MoveableObject {
  offset = {
    top: 140,
    bottom: 15,
    left: 35,
    right: 35,
  };
  y = 190;
  width = 120;
  height = 260;
  speedX = 10;
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
  imagesHurting = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  imagesDead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  speed = 8;
  world;
  walkingSound = new Audio("audio/walking.mp3");
  collectedBottles = 0;
  collectedCoins = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png"); //Todo - brauch ich nicht mehr
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesHurting);
    this.loadImages(this.imagesDead);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      //walk right
      this.walkingSound.pause();
      if (this.world.keyboard.right && this.x < world.currentLevel.levelEndX) {
        this.lookToLeft = false;
        this.moveRight();
        this.walkingSound.play();
      }
      //walk left
      if (this.world.keyboard.left && this.x > 0) {
        this.lookToLeft = true;
        this.moveLeft();
        this.walkingSound.play();
      }
      //jump
      if (this.world.keyboard.space && !this.isAboveGround()) {
        this.jump();
      }

      if (this.collectedCoins == 5) {
        //speed for collected bottles
        this.speedX = 15;
        this.collectedCoins = 0;
        setTimeout(() => {
          this.speedX = 10;
        }, 3000);
      }

      this.world.cameraX = -this.x + 80;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
      } else if (this.isHurting()) {
        this.playAnimation(this.imagesHurting);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.imagesJumping);
      } else {
        if (this.world.keyboard.right || this.world.keyboard.left) {
          this.playAnimation(this.imagesWalking);
        }
      }
    }, 100);
  }
}
