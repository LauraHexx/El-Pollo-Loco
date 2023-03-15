class StatusBarHealth extends DrawableObject {
  x = 40;
  y = 0;
  width = 200;
  height = 60;
  percentage = 100;
  imagesBarHealth = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.imagesBarHealth);
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesBarHealth[this.getIndexImage()];
    this.img = this.imageCache[path];
  }

  getIndexImage() {
    return this.percentage / 20;
  }
}
