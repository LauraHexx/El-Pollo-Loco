let level2 = initLevel();

function initLevel() {
  return new Level(
    createEnemies(),
    createClouds(),
    createBackgroundObjects(),
    createBottles(),
    createCoins()
  );
}

function createEnemies() {
  return [
    new Chicken(1),
    new Chicken(1.1),
    new Chicken(1.2),
    new Chicken(1.2),
    new Chicken(1.3),
    new Chicken(1.3),
    new ChickenSmall(1.4),
    new ChickenSmall(1.4),
    new ChickenSmall(1.5),
    new ChickenSmall(1.5),
    new ChickenSmall(1.6),
    new ChickenSmall(1.7),
  ];
}

function createClouds() {
  return [new Cloud(300), new Cloud(1500), new Cloud(2700)];
}

function createBackgroundObjects() {
  return [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 1438),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1438),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1438),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1438),

    new BackgroundObject("img/5_background/layers/air.png", 2157),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2157),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 2157),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2157),

    new BackgroundObject("img/5_background/layers/air.png", 2876),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 2876),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 2876),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 2876),

    new BackgroundObject("img/5_background/layers/air.png", 3595),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 3595),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 3595),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 3595),
  ];
}

function createBottles() {
  return [
    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      1300,
      345
    ),
    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      1600,
      345
    ),
    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      1900,
      345
    ),
    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      2300,
      345
    ),

    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      2500,
      345
    ),
  ];
}

function createCoins() {
  return [
    new CollectableCoin(550, 155),
    new CollectableCoin(700, 155),
    new CollectableCoin(850, 155),
    new CollectableCoin(1000, 155),
    new CollectableCoin(1150, 155),
  ];
}
