class CollectableBottle extends DrawableObject {
  offset = {
    top: 25,
    left: 45,
    right: 45,
    bottom: 25,
  };
  width = 90;
  height = 90;

  constructor(path, x, y) {
    super().loadImage(path);
    this.x = x;
    this.y = y;
  }
}
