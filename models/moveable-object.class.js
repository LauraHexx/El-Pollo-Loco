class MoveableObject extends DrawableObject {
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  y = 170;
  speedX = 0.25; //if you change it you also need to change it in continueGame()
  lookToLeft = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;
  lastAction = 0;

  playAnimation(images) {
    let i = this.curentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.curentImage++;
  }

  isOnTop(obj) {
    return (
      this.y + this.height &&
      this.x + this.width >= obj.y + obj.height &&
      obj.x + obj.width
    );
  }

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead();
    } else {
      this.lastHit = new Date().getTime(); //speichern des Zeitpunktes, wann Character verletzt wurde
    }
  }

  wasHit() {
    return this.energy < 100;
  }

  isDead() {
    return this.energy == 0;
  }

  isHurting() {
    this.lastAction = new Date().getTime();
    let timePassed = new Date().getTime() - this.lastHit; // Differenz aktuelle Zeit und letzter Zeitpunkt hit
    timePassed = timePassed / 1000;
    return timePassed < 3; //gibt true zurück
  }

  moveLeft() {
    if (this instanceof Endboss && this.x <= 0) {
      this.speedX = 0;
    }
    this.x -= this.speedX;
  }

  moveRight() {
    this.x += this.speedX;
  }

  jump() {
    if (this.isAboveGround()) {
      this.speedY = 5; //wenn ein Enemy gekilled wurde
    } else {
      this.speedY = 25;
    }
  }

  isAsleep() {
    let timePassed = new Date().getTime() - this.lastAction;
    timePassed = timePassed / 1000;
    return timePassed > 3;
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
      return this.y < 170;
    }
  }
}
