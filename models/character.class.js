class Character extends MoveableObject {
  y = 165;
  width = 130;
  height = 280;
  imagesWalking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  curentImage = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.curentImage % this.imagesWalking.length;
      let path = this.imagesWalking[i];
      this.img = this.imageCache[path];
      this.curentImage++;
    }, 100);
  }

  jump() {}
}
