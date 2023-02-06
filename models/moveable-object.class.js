class MoveableObject extends DrawableObject {
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  speedX = 0.25;
  objvingLeft = false;
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

  /*

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.y + this.height >= obj.y &&
      this.x < obj.x &&
      this.y < obj.y
    );
  }

  */

  /*

  isOnTop(obj) {
    return (
      this.y + this.height &&
      this.x + this.width >= obj.y + obj.height &&
      obj.x + obj.width
    );
  }

  */

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }
  /*
  isCollidingChicken(obj) {
    return (
      this.x + this.width - this.offset.left > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x - this.offset.left + obj.width &&
      this.y < obj.y + obj.height
    );
  }
  */

  hit() {
    this.energy -= 20;
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
    return timePassed < 3; //gibt true zurück
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  moveRight() {
    this.x += this.speedX;
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
    if (this instanceof ThrowableObject) {
      //throwable objects sollten immer fallen
      return true;
    } else {
      return this.y < 150;
    }
  }
}
