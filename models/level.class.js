class Level {
  enemies;
  clouds;
  backgroundObjects;
  levelEndX = 2234;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
