class Character extends MoveableObject {
  y = 165;
  width = 130;
  height = 280;
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
  }

  jump() {}
}
