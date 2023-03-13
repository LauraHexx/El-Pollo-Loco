class Keyboard {
  LEFT = false;
  RIGHT = false;
  SPACE = false;
  D = false;

  constructor() {
    this.checkIfButtonTouched();
    this.checkIfButtonNotTouched();
  }

  // KEYS

  window.addEventListener("keydown", (event) => {
    if (!gameIsOver) {
      if (event.keyCode == 37) {
        // LEFT
        this.LEFT = true;
      }
      if (event.keyCode == 39) {
        // RIGHT
        this.RIGHT = true;
      }
      if (event.keyCode == 32) {
        // SPACE
        this.SPACE = true;
      }
      if (event.keyCode == 68) {
        // d
        this.D = true;
      }
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.keyCode == 37) {
      // LEFT
      this.LEFT = false;
    }
    if (event.keyCode == 39) {
      // RIGHT
      this.RIGHT = false;
    }
    if (event.keyCode == 32) {
      // SPACE
      this.SPACE = false;
    }
    if (event.keyCode == 68) {
      // d
      this.D = false;
    }
  });

  // ACTION BUTTONS

  checkIfButtonTouched() {
    document
      .getElementById("buttonLeft")
      .addEventListener("touchstart", (event) => {
        // LEFT
        this.LEFT = true;
      });
    document
      .getElementById("buttonRight")
      .addEventListener("touchstart", (event) => {
        // RIGHT
        this.RIGHT = true;
      });
    document
      .getElementById("buttonUp")
      .addEventListener("touchstart", (event) => {
        // SPACE
        this.SPACE = true;
      });
    document
      .getElementById("buttonBottle")
      .addEventListener("touchstart", (event) => {
        // d
        this.D = true;
      });
  }

  checkIfButtonNotTouched() {
    document
      .getElementById("buttonLeft")
      .addEventListener("touchend", (event) => {
        // LEFT
        this.LEFT = false;
      });
    document
      .getElementById("buttonRight")
      .addEventListener("touchend", (event) => {
        // RIGHT
        this.RIGHT = false;
      });
    document.getElementById("buttonUp").addEventListener("touchend", (event) => {
      // SPACE
      this.SPACE = false;
    });
    document
      .getElementById("buttonBottle")
      .addEventListener("touchend", (event) => {
        // d
        this.D = false;
      });
  }
}
