class StatusBarCoin extends DrawableObject {
  x = 40;
  y = 50;
  width = 200;
  height = 60;
  percentage = 0;
  imagesBarCoin = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.imagesBarCoin);
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesBarCoin[this.getIndexImage()];
    this.img = this.imageCache[path];
  }

  getIndexImage() {
    return this.percentage;
  }
}
