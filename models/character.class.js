class Character extends MoveableObject {
  offset = {
    top: 120,
    left: 20,
    right: 20,
    bottom: 20,
  };
  y = 170;
  width = 130;
  height = 260;
  speedX = 10;
  imageStanding = ["img/2_character_pepe/1_idle/idle/I-1.png"];
  imagesSleeping = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
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
  collectedBottles = 0;
  collectedCoins = 0;
  isStillStanding = false;
  getsPushed = false;

  energy = 20; //löschen

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png"); //Todo - brauch ich nicht mehr
    this.loadImages(this.imageStanding);
    this.loadImages(this.imagesSleeping);
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
      AUDIO_characterWalk.pause();
      if (
        this.world.keyboard.right &&
        this.x <= this.world.endboss.x &&
        !this.getsPushed &&
        !this.world.gameIsOver
      ) {
        this.lastAction = new Date().getTime();
        this.lookToLeft = false;
        this.offset.right = 20;
        this.moveRight();
        playCharacterWalkAudio();
      }
      //walk left
      if (
        this.world.keyboard.left &&
        this.x > 0 &&
        !this.getsPushed &&
        !this.world.gameIsOver
      ) {
        this.lastAction = new Date().getTime();
        this.lookToLeft = true;
        this.offset.right = 60;
        this.moveLeft();
        playCharacterWalkAudio();
      }
      //jump
      if (this.world.keyboard.space && !this.isAboveGround()) {
        this.lastAction = new Date().getTime();
        this.jump();
        playCharacterJumpAudio();
      }

      if (this.collectedCoins == 5) {
        //speed for collected bottles
        this.isUnstoppable = true;
        this.speedX = 15;
        this.collectedCoins = 0;
        this.showUnstoppable();
        playUnstoppableAudio();
        setTimeout(() => {
          this.speedX = 10;
          this.isUnstoppable = false;
          this.hideUnstoppable();
        }, 2500);
      }

      if (this.getsPushed && this.x < this.world.endboss.powerOfPushing) {
        this.x -= this.x;
      } else if (this.getsPushed) {
        this.x -= this.world.endboss.powerOfPushing;
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
      } else if (this.world.keyboard.right || this.world.keyboard.left) {
        this.playAnimation(this.imagesWalking);
      } else if (this.isAsleep()) {
        this.playAnimation(this.imagesSleeping);
      } else {
        this.playAnimation(this.imageStanding);
      }
    }, 100);
  }

  showUnstoppable() {
    let unstoppable = getId("unstoppable");
    unstoppable.classList.remove("d-none");
  }

  hideUnstoppable() {
    let unstoppable = getId("unstoppable");
    unstoppable.classList.add("d-none");
  }
}
