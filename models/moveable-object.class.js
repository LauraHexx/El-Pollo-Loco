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

  //ANIMATION

  playAnimation(images) {
    let i = this.curentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.curentImage++;
  }

  //ENERGY + MOVEMENT

  hit() {
    this.subtractEnergy();
    if (!this.isDead()) {
      this.lastHit = new Date().getTime();
      this.lastAction = new Date().getTime();
    }
  }

  subtractEnergy() {
    this.energy -= 20;
  }

  isDead() {
    return this.energy <= 0;
  }

  wasHit() {
    return this.energy < 100;
  }

  isHurting() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 3;
  }

  //MOVEMENT

  cannotMove() {
    return (this.speedX = 0);
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  moveRight() {
    this.x += this.speedX;
  }

  jump() {
    this.speedY = 20;
  }

  isAboveGround() {
    if (this instanceof ThrowableBottle) {
      return true;
    } else {
      return this.y < this.characterOnGroundY;
    }
  }

  isAtStart() {
    return this.x <= 0;
  }

  isAsleep() {
    let timePassed = new Date().getTime() - this.lastAction;
    timePassed = timePassed / 1000;
    return timePassed > 5;
  }

  //COLLIDING

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  //GRAVITY

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
}
