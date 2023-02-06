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
  statusBarEndboss = [];
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
      this.checkCollisionsEnemies();
      this.checkCollisionsEndboss();
      this.checkCollisionsBottles();
      this.checkCollisionsCoins();
      this.checkThrowObjects();
      this.checkIfEndboss();
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
      if (this.character.isColliding(enemy) && !this.character.isHurting()) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        console.log(this.character.energy);
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

  checkThrowObjects() {
    if (
      this.keyboard.d &&
      !this.character.movingLeft &&
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

  checkIfEndboss() {
    // soll nur einmal ausgeführt werden
    if (this.statusBarEndboss.length === 0)
      if (this.endboss.x - this.character.x < 450) {
        let statusBar = new StatusBarEndboss(3500, 50);
        this.statusBarEndboss.push(statusBar);
      }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas muss immer wieder gelöscht werden - vordefinierte Funktion von JavaScript
    this.ctx.translate(this.cameraX, 0);
    this.arrayToMap(this.currentLevel.backgroundObjects);

    this.ctx.translate(-this.cameraX, 0);
    //Space for fixed Objects

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
    this.arrayToMap(this.statusBarEndboss);

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
    if (obj.movingLeft) {
      this.flipImage(obj);
    }

    obj.drawImages(this.ctx); //zum Auslagern der DrawImage Funktion in Drawable Object
    obj.drawFrames(this.ctx);

    if (obj.movingLeft) {
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
