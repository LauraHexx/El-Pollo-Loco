class CollectableBottle extends DrawableObject {
  width = 90;
  height = 90;

  constructor(path, x, y) {
    super().loadImage(path);
    this.x = x;
    this.y = y;
  }
}
