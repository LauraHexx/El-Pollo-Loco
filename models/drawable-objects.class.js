class DrawableObject {
  x = 0;
  y = 250;
  width = 130;
  height = 170;
  img;
  imageCache = {};
  curentImage = 0;

  loadImage(path) {
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
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn("Image could not loaded", error);
      console.log(this.img.src);
    }
  }

  /**
   * This function supports colliding development
   *
   */
  drawFrames(ctx) {
    if (this.isCorrectObject()) {
      this.frameGetsDrawed(ctx);
    }
  }

  isCorrectObject() {
    return (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    );
  }

  frameGetsDrawed(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}
