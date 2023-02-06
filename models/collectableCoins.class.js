class CollectableCoin extends MoveableObject {
  offset = {
    top: 25,
    bottom: 25,
    left: 25,
    right: 25,
  };

  x = 100;
  y = 105;
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
