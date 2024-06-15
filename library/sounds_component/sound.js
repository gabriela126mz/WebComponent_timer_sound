export class SoundsComponent extends HTMLElement {
    constructor() {
        super();
        this.audio = new Audio('./../../src/sounds/fairy.mp3'); 
    }

    playSonidoMp3() {
        this.audio.play();
    }
}

customElements.define('sounds-component', SoundsComponent);
