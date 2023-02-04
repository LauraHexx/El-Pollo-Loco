class World {
  canvas;
  keyboard;
  ctx;
  currentLevel = level1;
  cameraX = 0;
  cameraY = 0;
  character = new Character();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
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
      this.checkCollisionsBottles();
      this.checkCollisionsCoins();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisionsEnemies() {
    this.currentLevel.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        console.log("Character is colliding enemy", this.character.energy);
      }
    });
  }

  checkCollisionsBottles() {
    this.currentLevel.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
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
