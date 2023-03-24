class Endboss extends MoveableObject {
  offset = {
    top: 70,
    bottom: 10,
    left: 55,
    right: 30,
  };
  x = 800;
  energy = 80;
  y = 80;
  speedX = 9;
  width = 270;
  height = 360;
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

  imagesAlert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  imagesHurting = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  imagesDead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  imagesAttack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  isAlarmed = false;
  powerOfPushing = 50;

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesHurting);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesAttack);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
      } else if (this.isHurting()) {
        this.playAnimation(this.imagesHurting);
      } else if (this.wasHit()) {
        this.playAnimation(this.imagesAttack);
        this.moveLeft();
      } else if (this.isAlarmed) {
        this.playAnimation(this.imagesAlert);
      }
    }, 100);
  }
}
