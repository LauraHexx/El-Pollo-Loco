class StatusBarBottle extends DrawableObject {
  x = 40;
  y = 100;
  width = 200;
  height = 60;
  percentage = 0;
  imagesBarBottle = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.imagesBarBottle);
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesBarBottle[this.getIndexImage()];
    this.img = this.imageCache[path];
  }

  getIndexImage() {
    return this.percentage;
  }
}
