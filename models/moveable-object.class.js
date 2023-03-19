class MoveableObject extends DrawableObject {
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  y = 170;
  speedX = 0.25;
  lookToLeft = false;
  acceleration = 2;
  energy = 100;
  lastHit = 0;
  lastAction;
  characterOnGroundY = 170;

  playAnimation(images) {
    let i = this.curentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.curentImage++;
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
      this.lastAction = new Date().getTime();
    }
  }

  wasHit() {
    return this.energy < 100;
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

  isNotMoving() {
    this.x -= this.speedX;
    this.x += this.speedX;
  }

  jump() {
    if (this.isAboveGround()) {
      this.speedY = 15; //when killing enemies
    } else {
      this.speedY = 20;
    }
  }

  isAsleep() {
    let timePassed = new Date().getTime() - this.lastAction;
    timePassed = timePassed / 1000;
    return timePassed > 5;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (
          this instanceof Character &&
          this.y - this.speedY > this.characterOnGroundY
        ) {
          this.speedY = (this.characterOnGroundY - this.y) * -1;
        }
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //throwable objects sollten immer fallen
      return true;
    } else {
      return this.y < this.characterOnGroundY;
    }
  }
}
