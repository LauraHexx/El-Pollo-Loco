class World {
  canvas;
  ctx;
  currentLevel;
  cameraX = 0;
  cameraY = 0;
  character = new Character();
  endboss = new Endboss();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  statusBarEndbossHeart = new StatusBarEndbossHeart();
  throwableBottles = [];

  constructor(canvas, keyboard, currentLevel) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.currentLevel = currentLevel;
    this.ctx = canvas.getContext("2d");
    this.setKeyboardForCharacter();
    this.draw();
    this.runIntervals();
    playAudio("background");
  }

  /**
   * This Function makes it possible to access the keyboard in Character Class
   *
   */
  setKeyboardForCharacter() {
    this.character.world = this;
  }

  //CANVAS

  /**
   * This Function draws all Elements in the Canvas.
   *
   */
  draw() {
    this.clearCanvas();
    this.ctx.translate(this.cameraX, 0);
    this.arrayToMap(this.currentLevel.backgroundObjects);
    this.ctx.translate(-this.cameraX, 0);
    this.oneObjectToMap(this.statusBarEndboss);
    this.oneObjectToMap(this.statusBarEndbossHeart);
    this.oneObjectToMap(this.statusBarHealth);
    this.oneObjectToMap(this.statusBarCoin);
    this.oneObjectToMap(this.statusBarBottle);
    this.ctx.translate(this.cameraX, 0);
    this.oneObjectToMap(this.character);
    this.oneObjectToMap(this.endboss);
    this.arrayToMap(this.currentLevel.clouds);
    this.arrayToMap(this.currentLevel.enemies);
    this.arrayToMap(this.throwableBottles);
    this.arrayToMap(this.currentLevel.bottles);
    this.arrayToMap(this.currentLevel.coins);
    this.ctx.translate(-this.cameraX, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  arrayToMap(array) {
    array.forEach((elementOfArray) => {
      this.oneObjectToMap(elementOfArray);
    });
  }

  oneObjectToMap(obj) {
    if (this.objectNeedsToBeFlipped(obj)) {
      this.flipImage(obj);
    }
    obj.drawImages(this.ctx);
    if (this.objectNeedsToBeFlipped(obj)) {
      this.flipImageBack(obj);
    }
  }

  objectNeedsToBeFlipped(obj) {
    return obj.lookToLeft;
  }

  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width / 2, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  //INTERVALLS

  runIntervals() {
    let intervale = setInterval(() => {
      this.checkCharacterCollidesEnemy();
      this.checkAppearanceEndboss();
      this.checkEndbossHurtingCharacter();
      this.checkEndbossPushingCharacter();
      this.checkCharacterCollectsCoins();
      this.checkCharacterCollectsBottle();
      this.checkCharacterThrowsBottles();
      this.checkBottleHurtingEndboss();
      this.checkBottleIsSmashed();
      this.checkIfWonOrLost();
    }, 100);
    intervalIds.push(intervale);
  }

  //ENEMIES

  checkCharacterCollidesEnemy() {
    this.currentLevel.enemies.forEach((enemy) => {
      if (this.characterJumpsOnTop(enemy)) {
        this.enemieGetsKilled(enemy);
      }
      if (this.enemieTouchesCharacter(enemy)) {
        this.characterGetsHurt();
      }
    });
  }

  characterJumpsOnTop(enemy) {
    return (
      !this.character.isHurting() &&
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY < 0
    );
  }

  enemieGetsKilled(enemy) {
    let indexEnemy = this.currentLevel.enemies.indexOf(enemy);
    let hittedEnemy = (this.currentLevel.enemies[indexEnemy].energy = 0);
    setTimeout(() => {
      this.currentLevel.enemies.splice(indexEnemy, 1);
    }, 100);
    this.character.jump();
    playAudio("chickenHit");
  }

  enemieTouchesCharacter(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isHurting() &&
      !this.character.isAboveGround() &&
      !this.character.isUnstoppable
    );
  }

  characterGetsHurt() {
    this.character.hit();
    this.statusBarHealth.setPercentage(this.character.energy);
    playAudio("characterHurt");
  }

  //ENDBOSS APPEARANCE

  checkAppearanceEndboss() {
    if (this.characterReachesEndboss()) {
      this.activatingEndboss();
    } else {
      this.hideStatusBarOfEndboss();
    }
  }

  characterReachesEndboss() {
    return this.endboss.x - this.character.x < 450;
  }

  activatingEndboss() {
    this.statusBarEndboss.width = 200;
    this.statusBarEndboss.height = 60;
    this.statusBarEndbossHeart.width = 70;
    this.statusBarEndbossHeart.height = 75;
    this.endboss.isAlarmed = true;
    playAudio("endboss");
    pauseAudio("background");
  }

  hideStatusBarOfEndboss() {
    this.statusBarEndboss.width = 0;
    this.statusBarEndboss.height = 0;
    this.statusBarEndbossHeart.width = 0;
    this.statusBarEndbossHeart.height = 0;
  }

  //ENDBOSS HURTING CHARACTER

  checkEndbossHurtingCharacter() {
    if (this.endbossTouchesCharacter()) {
      this.characterGetsHurt();
    }
  }

  endbossTouchesCharacter() {
    return (
      !this.character.isHurting() && this.character.isColliding(this.endboss)
    );
  }

  checkEndbossPushingCharacter() {
    if (this.endbossCollidesCharacter()) {
      this.characterGetsPushed();
    } else {
      this.characterGetsNotPushed();
    }
  }

  endbossCollidesCharacter() {
    return this.character.isColliding(this.endboss);
  }

  characterGetsPushed() {
    this.character.getsPushed = true;
  }

  characterGetsNotPushed() {
    this.character.getsPushed = false;
  }

  checkIfGetsPushedByEndboss() {}

  //COINS - COLLECTING

  checkCharacterCollectsCoins() {
    this.currentLevel.coins.forEach((coin) => {
      if (this.characterCollidesCoin(coin)) {
        this.coinGetsCollected(coin);
      }
    });
  }

  characterCollidesCoin(coin) {
    return this.character.isColliding(coin) && !this.character.isHurting();
  }

  coinGetsCollected(coin) {
    this.character.collectedCoins++;
    this.statusBarCoin.setPercentage(this.character.collectedCoins);
    this.currentLevel.coins.splice(this.currentLevel.coins.indexOf(coin), 1);
    playAudio("coinCollected");
  }

  //BOTTLES - COLLECTING

  checkCharacterCollectsBottle() {
    this.currentLevel.bottles.forEach((bottle) => {
      if (this.characterCollidesBottle(bottle)) {
        this.bottleGetsCollected(bottle);
      }
    });
  }

  characterCollidesBottle(bottle) {
    return this.character.isColliding(bottle) && !this.character.isHurting();
  }

  bottleGetsCollected(bottle) {
    this.character.collectedBottles++;
    this.statusBarBottle.setPercentage(this.character.collectedBottles);
    this.currentLevel.bottles.splice(
      this.currentLevel.bottles.indexOf(bottle),
      1
    );
    playAudio("bottleCollected");
  }

  //BOTTLES - THROWING

  checkCharacterThrowsBottles() {
    if (this.characterCanThrowBottles()) {
      this.bottlesGetThrown();
    }
  }

  characterCanThrowBottles() {
    return (
      this.keyboard.SPACE &&
      !this.character.lookToLeft &&
      !this.character.isHurting() &&
      this.character.collectedBottles > 0
    );
  }

  bottlesGetThrown() {
    this.character.lastAction = new Date().getTime();
    this.character.collectedBottles--;
    this.statusBarBottle.setPercentage(this.character.collectedBottles);
    let bottle = new ThrowableBottle(
      this.character.x + this.character.width + 10,
      this.character.y + 50
    );
    this.throwableBottles.push(bottle);
  }

  //BOTTLES - HURTING ENDBOSS

  checkBottleHurtingEndboss() {
    this.throwableBottles.forEach((bottle) => {
      if (this.bottleCollidesEndboss(bottle)) {
        this.endbossGetsHurt();
      }
    });
  }

  bottleCollidesEndboss(bottle) {
    return this.endboss.isColliding(bottle) && !this.endboss.isHurting();
  }

  endbossGetsHurt() {
    this.endboss.isAlarmed = false;
    this.endboss.hit();
    this.statusBarEndboss.setPercentage(this.endboss.energy);
    playAudio("chickenHit");
  }

  //BOTTLES - SMASHED

  checkBottleIsSmashed() {
    this.throwableBottles.forEach((bottle) => {
      if (this.bottleCollidesBottomOrEndboss(bottle)) {
        this.clearBottle(bottle);
      }
    });
  }

  bottleCollidesBottomOrEndboss(bottle) {
    return bottle.hitGround() || this.endboss.isColliding(bottle);
  }

  clearBottle(bottle) {
    bottle.isSmashed = true;
    playAudio("bottleSmashed");
    setTimeout(() => {
      this.throwableBottles.splice(this.throwableBottles.indexOf(bottle), 1);
    }, 500);
  }

  //GAME IS OVER

  checkIfWonOrLost() {
    if (this.characterDied()) {
      this.showGameLost();
      this.changeStyleForEndscreen();
      this.stopAudiosAndIntervale();
    }
    if (this.endbossDied()) {
      this.showGameWon();
      this.changeStyleForEndscreen();
      this.stopAudiosAndIntervale();
    }
  }

  characterDied() {
    return this.character.energy == 0 && !this.gameIsOver;
  }

  showGameLost() {
    gameIsOver = true;
    document.getElementById("gameOverImg").src =
      "img/9_intro_outro_screens/game_over/oh no you lost!.png";
    playAudio("gameLost");
  }

  endbossDied() {
    return this.endboss.energy == 0 && !this.gameIsOver;
  }

  showGameWon() {
    gameIsOver = true;
    document.getElementById("gameOverImg").src =
      "img/9_intro_outro_screens/game_over/game over!.png";
    playAudio("gameWon");
  }

  changeStyleForEndscreen() {
    document.getElementById("gameOver").classList.remove("d-none");
    document.getElementById("mobileWalk").classList.add("d-none");
    document.getElementById("mobileActions").classList.add("d-none");
  }

  stopAudiosAndIntervale() {
    pauseAudio("endboss");
    pauseAudio("background");
    stopIntervale();
  }
}
