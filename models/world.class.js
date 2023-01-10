class World {
  canvas;
  keyboard;
  ctx;
  cameraX = 0;
  cameraY = 0;
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    //Todo: For - Schleife
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 1438),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1438),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1438),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1438),

    new BackgroundObject("img/5_background/layers/air.png", 2157),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2157),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 2157),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2157),
  ];

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d"); //so kann man auf das Canvas malen - bestimmte Funktionen damit aufrufen - ctx: Context (Standard)
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this; // world übergeben, damit Zugriff auf Keyboard - ist in Java Script nicht schön gelöst
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas muss immer wieder gelöscht werden - vordefinierte Funktion von JavaScript
    this.ctx.translate(this.cameraX, 0);
    this.arrayToMap(this.backgroundObjects);
    this.arrayToMap(this.clouds);
    this.oneObjectToMap(this.character);
    this.arrayToMap(this.enemies);
    this.ctx.translate(-this.cameraX, 0);

    //draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  oneObjectToMap(obj) {
    //vordefinierte Funktion von JavaScript
    if (obj.movingLeft) {
      this.flipImage(obj);
    }
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    if (obj.movingLeft) {
      this.flipImageBack(obj);
    }
  }

  arrayToMap(array) {
    array.forEach((elementOfArray) => {
      this.oneObjectToMap(elementOfArray);
    });
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
