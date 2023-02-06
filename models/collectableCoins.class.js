class CollectableCoin extends MoveableObject {
  offset = {
    top: 100,
    left: 10,
    right: 10,
    bottom: 10,
  };
  x = 100;
  y = 100;
  width = 120;
  height = 120;
  imagesCoin = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.imagesCoin);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesCoin);
    }, 100);
  }
}
