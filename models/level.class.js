class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  levelEndX = 2230;

  constructor(enemies, clouds, backgroundObjects, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
  }
}
