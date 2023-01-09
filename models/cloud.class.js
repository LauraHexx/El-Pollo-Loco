class Cloud extends MoveableObject {
  y = 20;
  width = 500;
  height = 250;
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 500; // Zahl zwischen 200 und 700
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.25;
    }, 1000 / 60);
  }
}
