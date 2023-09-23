class Controls {
  constructor(type) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this.space = false;
    
    switch (type) {
      case 'KEYS': this.#addKeyboardListeners(); break;
      case 'DUMMY': this.forward = true; break;
    }
  }
  
  #addKeyboardListeners() {
    document.onkeydown = (event) => {
      switch(event.keyCode) {
        case 87: this.forward=true; break; // W
        case 83: this.reverse=true; break; // S
        case 65: this.left=true; break; // A
        case 68: this.right=true; break; // D
        case 32: this.space=true; break; // D
      }
    }
    document.onkeyup = (event) => {
      switch(event.keyCode) {
        case 87: this.forward=false; break; // W
        case 83: this.reverse=false; break; // S
        case 65: this.left=false; break; // A
        case 68: this.right=false; break; // D  
        case 32: this.space=false; break; // D  
      }
    }
  }
}