class StatusBarEndbossHeart extends DrawableObject {
  x = 485;
  y = 52;
  width = 0;
  height = 0;
  percentage = 100;
  imagesHeart = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

  constructor() {
    super().loadImage(this.imagesHeart);
  }
}
