class DrawableObject {
  x = 120;
  y = 250;
  width = 130;
  height = 170;
  img;
  imageCache = {};
  curentImage = 0;

  loadImage(path) {
    //erstellt ein img html tag
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawImages(ctx) {
    // wird von world übergeben
    //von JS vordefinierte Funktion
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrames(ctx) {
    // wird von world übergeben
    if (this instanceof Character || this instanceof Chicken) {
      // wird nur ausgeführt wenn Character oder Chicken
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
