class CollectableBottle extends DrawableObject {
  offset = {
    top: 10,
    bottom: 10,
    left: 30,
    right: 30,
  };
  width = 90;
  height = 90;

  constructor(path, x, y) {
    super().loadImage(path);
    this.x = x;
    this.y = y;
  }
}
