class World {
  canvas;
  ctx;
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d"); //so kann man auf das Canvas malen - bestimmte Funktionen damit aufrufen - ctx: Context (Standard)
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas muss immer wieder gelöscht werden
    //drawImage ist Funktion von vordefinierte Funktion von JavaScript
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );

    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.img,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
    });

    this.clouds.forEach((cloud) => {
      this.ctx.drawImage(
        cloud.img,
        cloud.x,
        cloud.y,
        cloud.width,
        cloud.height
      );
    });

    let self = this;

    requestAnimationFrame(function () {
      //draw wird immer wieder aufgerufen
      self.draw();
    });
  }
}
