class CollectableCoin extends DrawableObject {
  imagesCoin = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = x;
    this.y = y;
    this.loadImages(this.imagesCoin);
  }
}
