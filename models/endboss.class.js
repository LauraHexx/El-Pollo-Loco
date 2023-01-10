class Endboss extends MoveableObject {
  x = 400;
  y = 165;
  width = 200;
  height = 280;
  imagesWalking = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png"); //Todo - brauch ich nicht mehr
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
