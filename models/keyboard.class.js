class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  SPACE = false;

  constructor() {
    this.eventKeyboardBtns();
    this.eventTouchpadBtns();
  }

  eventKeyboardBtns() {
    /**
     * check whether the button is pressed
     */
    window.addEventListener("keydown", (event) => {
      if (!gameIsOver) {
        if (event.keyCode == 37) {
          this.LEFT = true;
        }
        if (event.keyCode == 39) {
          this.RIGHT = true;
        }
        if (event.keyCode == 32) {
          this.SPACE = true;
        }
        if (event.keyCode == 38) {
          this.UP = true;
        }
      }
    });

    /**
     * check whether the button has been released
     */

    window.addEventListener("keyup", (event) => {
      if (event.keyCode == 37) {
        this.LEFT = false;
      }
      if (event.keyCode == 39) {
        this.RIGHT = false;
      }
      if (event.keyCode == 32) {
        this.SPACE = false;
      }
      if (event.keyCode == 38) {
        this.UP = false;
      }
    });
  }

  /**
   * Functions for the touch buttons in the mobile view
   */
  eventTouchpadBtns() {
    setTimeout(() => {
      document
        .getElementById("btnLeft")
        .addEventListener("touchstart", (event) => {
          event.preventDefault();
          this.LEFT = true;
        });

      document
        .getElementById("btnLeft")
        .addEventListener("touchend", (event) => {
          event.preventDefault();
          this.LEFT = false;
        });

      document
        .getElementById("btnRight")
        .addEventListener("touchstart", (event) => {
          event.preventDefault();
          this.RIGHT = true;
        });

      document
        .getElementById("btnRight")
        .addEventListener("touchend", (event) => {
          event.preventDefault();
          this.RIGHT = false;
        });

      document
        .getElementById("btnUp")
        .addEventListener("touchstart", (event) => {
          event.preventDefault();
          this.UP = true;
        });

      document.getElementById("btnUp").addEventListener("touchend", (event) => {
        event.preventDefault();
        this.UP = false;
      });

      document
        .getElementById("btnBottle")
        .addEventListener("touchstart", (event) => {
          event.preventDefault();
          this.SPACE = true;
        });

      document
        .getElementById("btnBottle")
        .addEventListener("touchend", (event) => {
          event.preventDefault();
          this.SPACE = false;
        });
    }, 500);
  }
}
