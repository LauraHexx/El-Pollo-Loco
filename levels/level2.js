const level2 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
  ],
  [new Cloud(300), new Cloud(1500), new Cloud(2700)],
  [
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
  ],
  [
    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      900,
      345
    ),
    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      1400,
      345
    ),
    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      1900,
      345
    ),
    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      2400,
      345
    ),

    new CollectableBottle(
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      2900,
      345
    ),
  ],
  [
    new CollectableCoin(500, 320),
    new CollectableCoin(800, 155),
    new CollectableCoin(1100, 320),
    new CollectableCoin(1300, 155),
    new CollectableCoin(1600, 320),
  ]
);
