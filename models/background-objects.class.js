class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  constructor(path, x) {
    super();
    this.loadImage(path);
    this.x = x;
    this.y = 480 - this.height;
  }
}
