class World {
  canvas;
  ctx;
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png"),
  ];

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d"); //so kann man auf das Canvas malen - bestimmte Funktionen damit aufrufen - ctx: Context (Standard)
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas muss immer wieder gelöscht werden - vordefinierte Funktion von JavaScript

    this.oneObjectToMap(this.character);

    this.arrayToMap(this.enemies);

    this.arrayToMap(this.clouds);

    this.arrayToMap(this.backgroundObjects);

    let self = this;

    requestAnimationFrame(function () {
      //draw wird immer wieder aufgerufen
      self.draw();
    });
  }

  oneObjectToMap(object) {
    //vordefinierte Funktion von JavaScript
    this.ctx.drawImage(
      object.img,
      object.x,
      object.y,
      object.width,
      object.height
    );
  }

  arrayToMap(array) {
    array.forEach((elementOfArray) => {
      this.oneObjectToMap(elementOfArray);
    });
  }
}
