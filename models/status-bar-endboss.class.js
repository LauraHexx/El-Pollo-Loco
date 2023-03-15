class StatusBarEndboss extends DrawableObject {
  x = 500;
  y = 50;
  width = 0;
  height = 0;
  percentage = 100;
  imagesBarEndboss = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  constructor() {
    super().loadImages(this.imagesBarEndboss);
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesBarEndboss[this.getIndexImage()];
    this.img = this.imageCache[path];
  }

  getIndexImage() {
    return this.percentage / 20;
  }
}
