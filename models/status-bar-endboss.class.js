class StatusBarEndboss extends DrawableObject {
  width = 200;
  height = 60;
  percentage = 5;
  imagesBarEndboss = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  constructor(x, y) {
    super().loadImages(this.imagesBarEndboss);
    this.x = x;
    this.y = y;
    this.setPercentage(5);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesBarEndboss[this.getIndexImage()];
    this.img = this.imageCache[path];
  }

  getIndexImage() {
    if (this.percentage == 5) return 5;
    else if (this.percentage == 4) return 4;
    else if (this.percentage == 3) return 3;
    else if (this.percentage == 2) return 2;
    else if (this.percentage == 1) return 1;
    else return 0;
  }
}
