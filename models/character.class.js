class Character extends MoveableObject {
  offset = {
    top: 120,
    left: 20,
    right: 20,
    bottom: 20,
  };
  width = 130;
  height = 260;
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
  collectedBottles = 0;
  collectedCoins = 0;
  speedX = 6;
  unstoppableSpeedX = 10;
  cacheSpeedXBeforeUnstoppable = [];
  getsPushed = false;
  world;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
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
      this.moveCharacter();
      this.checkIfUnstoppableMode();
      this.checkIfGetsPushed();
      this.world.cameraX = -this.x + 80;
    }, 1000 / 60);
    setInterval(() => this.playCharacter(), 100);
  }

  //MOVE THE CHARACTER

  moveCharacter() {
    pauseAudio("characterWalk");
    if (this.canMoveRight()) {
      this.moveRight();
    }
    if (this.canMoveLeft()) {
      this.moveLeft();
    }
    if (this.canJump()) {
      this.jump();
    }
  }

  canMoveRight() {
    return (
      this.world.keyboard.RIGHT &&
      this.x <= this.world.endboss.x &&
      !this.getsPushed
    );
  }

  moveRight() {
    super.moveRight();
    this.lastAction = new Date().getTime();
    this.lookToLeft = false;
    this.offset.right = 20;
    playAudio("characterWalk");
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0 && !this.getsPushed;
  }

  moveLeft() {
    super.moveLeft();
    this.lastAction = new Date().getTime();
    this.lookToLeft = true;
    this.offset.right = 60;
    playAudio("characterWalk");
  }

  canJump() {
    return this.world.keyboard.UP && !this.isAboveGround();
  }

  jump() {
    super.jump();
    this.lastAction = new Date().getTime();
    playAudio("characterJump");
  }

  //UNSTOPPABLE MODE

  checkIfUnstoppableMode() {
    if (this.collectedAllCoins()) {
      playAudio("unstoppable");
      this.enableUnstoppableMode();
      setTimeout(() => this.disableUnstoppableMode(), 2200);
    }
  }

  collectedAllCoins() {
    return this.collectedCoins == 5;
  }

  /**
   * This Function makes Character faster and not vulnerable
   *
   */
  enableUnstoppableMode() {
    this.isUnstoppable = true;
    this.saveInitialSpeedX();
    this.speedX = this.unstoppableSpeedX;
    this.showUnstoppable();
  }

  /**
   * This Function saves initial speedX
   *
   */
  saveInitialSpeedX() {
    this.speedXBeforeUnstoppable = this.speedX;
    this.cacheSpeedXBeforeUnstoppable.push(this.speedXBeforeUnstoppable);
  }

  showUnstoppable() {
    document.getElementById("unstoppable").classList.remove("d-none");
  }

  /**
   * This Function makes Character slower and  vulnerable
   *
   */
  disableUnstoppableMode() {
    this.isUnstoppable = false;
    this.getInitialSpeedX();
    this.collectedCoins = 0;
    this.hideUnstoppable();
  }

  /**
   * This Function resets speedX to saved inital value
   *
   */
  getInitialSpeedX() {
    this.speedX = this.cacheSpeedXBeforeUnstoppable[0];
    this.cacheSpeedXBeforeUnstoppable.splice(
      1,
      this.cacheSpeedXBeforeUnstoppable.length - 1
    );
  }

  hideUnstoppable() {
    document.getElementById("unstoppable").classList.add("d-none");
  }

  //PUSHING OF ENDBOSS

  checkIfGetsPushed() {
    if (this.getsPushedNearStart()) {
      this.pushToStart();
    } else if (this.getsPushedFarFromStart()) {
      this.pushWithFullPower();
    }
  }

  getsPushedNearStart() {
    return this.getsPushed && this.x < this.world.endboss.powerOfPushing;
  }

  pushToStart() {
    return (this.x -= this.x);
  }

  getsPushedFarFromStart() {
    return this.getsPushed;
  }

  pushWithFullPower() {
    this.x -= this.world.endboss.powerOfPushing;
    setTimeout(() => {
      this.getsPushed = false;
    }, 100);
  }

  //ANIMATION

  playCharacter() {
    pauseAudio("characterSnore");
    if (gameIsOver && this.energy > 0) {
      this.playAnimation(this.imageStanding);
    } else if (this.isDead()) {
      this.playAnimation(this.imagesDead);
    } else if (this.isHurting()) {
      this.playAnimation(this.imagesHurting);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.imagesJumping);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.imagesWalking);
    } else if (this.isAsleep()) {
      this.playAnimation(this.imagesSleeping);
      playAudio("characterSnore");
    } else {
      this.playAnimation(this.imageStanding);
    }
  }
}
