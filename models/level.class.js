class Level {
  enemies;
  clouds;
  backgroundObjects;
  collectableObjecs;
  levelEndX = 2230;

  constructor(enemies, clouds, backgroundObjects, collectableObjecs) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectableObjecs = collectableObjecs;
  }
}
