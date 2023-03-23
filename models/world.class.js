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
    playAudio("background");
    this.setKeyboardForCharacter();
    this.draw();
    this.runIntervals();
  }

  setKeyboardForCharacter() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.arrayToMap(this.currentLevel.backgroundObjects);
    this.ctx.translate(-this.cameraX, 0);
    //Space for fixed Objects
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

  arrayToMap(array) {
    array.forEach((elementOfArray) => {
      this.oneObjectToMap(elementOfArray);
    });
  }

  oneObjectToMap(obj) {
    if (obj.lookToLeft) {
      this.flipImage(obj);
    }
    obj.drawImages(this.ctx);
    if (obj.lookToLeft) {
      this.flipImageBack(obj);
    }
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

  runIntervals() {
    let intervale = setInterval(() => {
      this.checkCollisionsEnemies();
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

  checkCollisionsEnemies() {
    this.currentLevel.enemies.forEach((enemy) => {
      if (this.characterCanHurtEnemie(enemy)) {
        this.enemieGetsHurt(enemy);
      }
      if (this.enemieCanHurtCharacter(enemy)) {
        this.characterGetsHurt();
      }
    });
  }

  characterCanHurtEnemie(enemy) {
    return (
      !this.character.isHurting() &&
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY < 0
    );
  }

  enemieGetsHurt(enemy) {
    let indexEnemy = this.currentLevel.enemies.indexOf(enemy);
    let hittedChicken = (this.currentLevel.enemies[indexEnemy].energy = 0);
    setTimeout(() => {
      this.currentLevel.enemies.splice(indexEnemy, 1);
    }, 100);
    this.character.jump();
    playAudio("chickenHit");
  }

  enemieCanHurtCharacter(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isHurting() &&
      !this.character.isAboveGround() &&
      !this.character.isUnstoppable
    );
  }

  //ENDBOSS APPEARANCE

  checkAppearanceEndboss() {
    if (this.characterIsNearEndboss()) {
      this.activatingEndboss();
    } else {
      this.notActivatingEndboss();
    }
  }

  characterIsNearEndboss() {
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

  notActivatingEndboss() {
    this.statusBarEndboss.width = 0;
    this.statusBarEndboss.height = 0;
    this.statusBarEndbossHeart.width = 0;
    this.statusBarEndbossHeart.height = 0;
  }

  //ENDBOSS HURTING CHARACTER

  checkEndbossHurtingCharacter() {
    if (this.endbossCanHurtCharacter()) {
      this.characterGetsHurt();
    }
  }

  endbossCanHurtCharacter() {
    return (
      !this.character.isHurting() && this.character.isColliding(this.endboss)
    );
  }

  characterGetsHurt() {
    this.character.hit();
    this.statusBarHealth.setPercentage(this.character.energy);
    playAudio("characterHurt");
  }

  checkEndbossPushingCharacter() {
    if (this.endbossCanPushCharacter()) {
      this.characterGetsPushed();
    } else {
      this.characterGetsNotPushed();
    }
  }

  endbossCanPushCharacter() {
    return this.character.isColliding(this.endboss);
  }

  characterGetsPushed() {
    this.character.getsPushed = true;
  }

  characterGetsNotPushed() {
    this.character.getsPushed = false;
  }

  //COLLECTING COINS

  checkCharacterCollectsCoins() {
    this.currentLevel.coins.forEach((coin) => {
      if (this.characterCanCollectCoin(coin)) {
        this.coinGetsCollected(coin);
      }
    });
  }

  characterCanCollectCoin(coin) {
    return this.character.isColliding(coin) && !this.character.isHurting();
  }

  coinGetsCollected(coin) {
    this.character.collectedCoins++;
    this.statusBarCoin.setPercentage(this.character.collectedCoins);
    this.currentLevel.coins.splice(this.currentLevel.coins.indexOf(coin), 1);
    playAudio("coinCollected");
  }

  //COLLECTING BOTTLES

  checkCharacterCollectsBottle() {
    this.currentLevel.bottles.forEach((bottle) => {
      if (this.characterCanCollectBottle(bottle)) {
        this.bottleGetsCollected(bottle);
      }
    });
  }

  characterCanCollectBottle(bottle) {
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

  //THROWING BOTTLES

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

  // ENDBOSS HURTING BY BOTTLES

  checkBottleHurtingEndboss() {
    this.throwableBottles.forEach((bottle) => {
      if (this.bottleCanHurtEndboss(bottle)) {
        this.endbossGetsHurt();
      }
    });
  }

  bottleCanHurtEndboss(bottle) {
    return this.endboss.isColliding(bottle) && !this.endboss.isHurting();
  }

  endbossGetsHurt() {
    this.endboss.isAlarmed = false;
    this.endboss.hit();
    this.statusBarEndboss.setPercentage(this.endboss.energy);
    playAudio("chickenHit");
  }

  //SMASHED BOTTLES

  checkBottleIsSmashed() {
    this.throwableBottles.forEach((bottle) => {
      if (this.bottleGetsSmashed(bottle)) {
        this.removeBottle(bottle);
      }
    });
  }

  bottleGetsSmashed(bottle) {
    return bottle.hitGround() || this.endboss.isColliding(bottle);
  }

  removeBottle(bottle) {
    bottle.isSmashed = true;
    playAudio("bottleSmashed");
    setTimeout(() => {
      this.throwableBottles.splice(this.throwableBottles.indexOf(bottle), 1);
    }, 500);
  }

  //GAME IS OVER

  checkIfWonOrLost() {
    if (this.gameIsLost()) {
      this.showGameLost();
      this.changeStyleForEndscreen();
      this.stopAudiosAndIntervale();
    }
    if (this.gameIsWon()) {
      this.showGameWon();
      this.changeStyleForEndscreen();
      this.stopAudiosAndIntervale();
    }
  }

  gameIsLost() {
    return this.character.energy == 0 && !this.gameIsOver;
  }

  showGameLost() {
    gameIsOver = true;
    document.getElementById("gameOverImg").src =
      "img/9_intro_outro_screens/game_over/oh no you lost!.png";
    playAudio("gameLost");
  }

  gameIsWon() {
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
