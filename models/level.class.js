class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  levelEndX = 3500;

  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
