class Coin extends MoveableObject {
  x = 100;
  y = 100;
  width = 80;
  height = 80;
  imagesCoin = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    this.x = x;
    this.y = y;
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.imagesCoin);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesCoin);
    }, 100);
  }
}
