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
  speed = 7;
  world;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      //walk right
      if (this.world.keyboard.right) {
        this.x += this.speed;
        this.movingLeft = false;
      }
      //walk left
      if (this.world.keyboard.left) {
        this.x -= this.speed;
        this.movingLeft = true;
      }
      this.world.cameraX = -this.x;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.right || this.world.keyboard.left) {
        //walk animation
        let i = this.curentImage % this.imagesWalking.length;
        let path = this.imagesWalking[i];
        this.img = this.imageCache[path];
        this.curentImage++;
      }
    }, 100);
  }

  jump() {}
}
