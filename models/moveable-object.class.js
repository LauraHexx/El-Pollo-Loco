class MoveableObject extends DrawableObject {
  speed = 0.25;
  movingLeft = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  playAnimation(images) {
    let i = this.curentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.curentImage++;
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.y + this.height >= obj.y &&
      this.x < obj.x &&
      this.y < obj.y
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead();
    } else {
      this.lastHit = new Date().getTime(); //speichern des Zeitpunktes, wann Character verletzt wurde
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurting() {
    let timePassed = new Date().getTime() - this.lastHit; // Differenz aktuelle Zeit und letzter Zeitpunkt hit
    timePassed = timePassed / 1000;
    return timePassed < 1; //gibt true zurück
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  jump() {
    this.speedY = 25;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 150;
  }
}
