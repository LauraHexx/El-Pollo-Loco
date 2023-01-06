class BackgroundObject extends MoveableObject {
  y = 480;
  constructor(path) {
    super().loadImage(path);
  }
}
