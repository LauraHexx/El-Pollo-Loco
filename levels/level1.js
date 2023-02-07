const level1 = new Level(
  [new Chicken()],
  [new Cloud()],
  [
    //Todo: For - Schleife
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
    new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 700, 140),
    new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 900, 140),
    new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 1100, 140),
    new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 1300, 140),
    new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 1500, 300),
  ],
  [
    new CollectableCoin(50, 140),
    new CollectableCoin(200, 140),
    new CollectableCoin(350, 140),
    new CollectableCoin(500, 140),
    new CollectableCoin(650, 300),
  ]
);
