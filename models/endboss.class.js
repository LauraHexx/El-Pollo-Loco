class Endboss extends MoveableObject {
  x = 2230;
  y = 165;
  width = 200;
  height = 280;
  imagesWalking = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png"); //Todo - brauch ich nicht mehr
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      //walk animation
      this.playAnimation(this.imagesWalking);
    }, 100);
  }
}
