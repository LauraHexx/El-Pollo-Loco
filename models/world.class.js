class World {
  canvas;
  keyboard;
  ctx;
  currentLevel = level1;
  cameraX = 0;
  cameraY = 0;
  character = new Character();
  endboss = new Endboss();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  statusBarEndbossHeart = new StatusBarEndbossHeart();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d"); //so kann man auf das Canvas malen - bestimmte Funktionen damit aufrufen - ctx: Context (Standard)
    this.setWorld();
    this.draw();
    this.alwaysChecking(); // Intervalle, die ständig geprüft werden
  }

  setWorld() {
    this.character.world = this; // world übergeben, damit Zugriff auf Keyboard - ist in Java Script nicht schön gelöst
  }

  alwaysChecking() {
    setInterval(() => {
      // this.checkHurtingEnemies();
      this.checkCollisionsEnemies();
      this.checkCollisionsEndboss();
      this.checkCollisionsBottles();
      this.checkCollisionsCoins();

      this.checkThrowObjects();
      this.checkAppearanceEndboss();
      this.checkHitEndboss();
    }, 200);
  }

  checkCollisionsEndboss() {
    if (!this.character.isHurting()) {
      if (this.character.isColliding(this.endboss)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        console.log(this.character.energy);
      }
    }
  }

  checkCollisionsEnemies() {
    this.currentLevel.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.isHurting() &&
        this.character.isAboveGround()
      ) {
        let indexEnemy = this.currentLevel.enemies.indexOf(enemy);
        let hittedChicken = (this.currentLevel.enemies[indexEnemy].energy = 0);
        this.character.jump();
      } else {
        if (this.character.isColliding(enemy) && !this.character.isHurting()) {
          this.character.hit();
          this.statusBarHealth.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkCollisionsBottles() {
    this.currentLevel.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle) && !this.character.isHurting()) {
        this.character.collectedBottles++;
        this.statusBarBottle.setPercentage(this.character.collectedBottles);
        this.currentLevel.bottles.splice(
          this.currentLevel.bottles.indexOf(bottle),
          1
        );
      }
    });
  }

  checkCollisionsCoins() {
    this.currentLevel.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectedCoins++;
        this.statusBarCoin.setPercentage(this.character.collectedCoins);
        this.currentLevel.coins.splice(
          this.currentLevel.coins.indexOf(coin),
          1
        );
      }
    });
  }

  checkHurtingEnemies() {}

  checkThrowObjects() {
    if (
      this.keyboard.d &&
      !this.character.lookToLeft &&
      this.character.collectedBottles > 0
    ) {
      this.character.collectedBottles--;
      this.statusBarBottle.setPercentage(this.character.collectedBottles);
      let bottle = new ThrowableObject(
        this.character.x + this.character.width + 10,
        this.character.y + 50
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkAppearanceEndboss() {
    // soll nur einmal ausgeführt werden
    if (this.endboss.x - this.character.x < 450) {
      this.statusBarEndboss.width = 200;
      this.statusBarEndboss.height = 60;
      this.statusBarEndbossHeart.width = 70;
      this.statusBarEndbossHeart.height = 75;
      this.endboss.isAlarmed = true;
    } else {
      this.statusBarEndboss.width = 0;
      this.statusBarEndboss.height = 0;
      this.statusBarEndbossHeart.width = 0;
      this.statusBarEndbossHeart.height = 0;
    }
  }

  checkHitEndboss() {
    this.throwableObjects.forEach((bottle) => {
      if (this.endboss.isColliding(bottle) && !this.endboss.isHurting()) {
        this.endboss.isAlarmed = false;
        this.endboss.hit();
        console.log(this.endboss.energy);
        this.statusBarEndboss.setPercentage(this.endboss.energy);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas muss immer wieder gelöscht werden - vordefinierte Funktion von JavaScript
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
    this.arrayToMap(this.throwableObjects);
    this.arrayToMap(this.currentLevel.bottles);
    this.arrayToMap(this.currentLevel.coins);

    this.ctx.translate(-this.cameraX, 0);

    //draw wird immer wieder aufgerufen
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

    obj.drawImages(this.ctx); //zum Auslagern der DrawImage Funktion in Drawable Object
    //obj.drawFrames(this.ctx);

    if (obj.lookToLeft) {
      this.flipImageBack(obj);
    }
  }

  flipImage(obj) {
    this.ctx.save(); //aktuellen Stand speichern
    this.ctx.translate(obj.width / 2, 0); // Spiegeln
    this.ctx.scale(-1, 1); //Beim Drehen der Laufrichtung muss Breite Character abgezogen werden
    obj.x = obj.x * -1; //x Koordinate wird durch spiegeln gedreht - anpassen
  }

  flipImageBack(obj) {
    obj.x = obj.x * -1; //x Koordinate auf Standard zurücksetzten
    this.ctx.restore(); // reseten zu "save()"
  }
}
