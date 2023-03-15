animate() {
    setInterval(() => {
     

      if (this.collectedCoins == 5) {
        //speed for collected bottles
        this.isUnstoppable = true;
        this.speedX = this.speedX + 5;
        this.collectedCoins = 0;
        this.showUnstoppable();
        playUnstoppableAudio();
        setTimeout(() => {
          this.speedX = 10;
          this.isUnstoppable = false;
          this.hideUnstoppable();
        }, 2200);
      }

      if (this.getsPushed && this.x < this.world.endboss.powerOfPushing) {
        this.x -= this.x;
      } else if (this.getsPushed) {
        this.x -= this.world.endboss.powerOfPushing;
        setTimeout(() => {
          this.getsPushed = false;
        }, 100);
      }

      this.world.cameraX = -this.x + 80;
    }, 1000 / 60);

    setInterval(() => {
      if (gameIsOver && this.energy > 0) {
        this.playAnimation(this.imageStanding);
      } else if (this.isDead()) {
        this.playAnimation(this.imagesDead);
      } else if (this.isHurting()) {
        this.playAnimation(this.imagesHurting);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.imagesJumping);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.imagesWalking);
      } else if (this.isAsleep()) {
        this.playAnimation(this.imagesSleeping);
      } else {
        this.playAnimation(this.imageStanding);
      }
    }, 100);
}
