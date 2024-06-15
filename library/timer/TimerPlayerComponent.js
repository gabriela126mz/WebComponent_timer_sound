import { SoundsComponent } from './../sounds_component/sound.js';

export class TimerPlayerComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <link rel="stylesheet" href="./../../src/css/style.css">
            <h1 class="smsfinish">¡Ready!</h1>
            <slot name="timerplayer"></slot>
            <button class="pause">Pause</button>
            <button class="play">Play</button>
            <button class="reset">Reset</button> 
            <div class="start">
                <label for="startInput">Configurar</label>
                <input class="startInput" id="startInput" type="number" value="10">
                <label for="startInput">  segundos</label>
            </div>
            <button class="save" id="saveButton">Guardar</button>
        `;
    }

    connectedCallback() {
        const timerComponent = this.querySelector('timer-part-component');
        const smsfinish = this.shadowRoot.querySelector('.smsfinish');
        const startInput = this.shadowRoot.getElementById('startInput');
        const saveButton = this.shadowRoot.getElementById('saveButton');

        saveButton.addEventListener('click', () => {
            const startValue = parseInt(startInput.value);
            if (!isNaN(startValue)) {
                timerComponent.setAttribute('start', startValue.toString());
                timerComponent.resetTime();
            }
        });

        this.shadowRoot.querySelector('.play').addEventListener('click', () => timerComponent.startTime());
        this.shadowRoot.querySelector('.pause').addEventListener('click', () => timerComponent.pauseTime());
        this.shadowRoot.querySelector('.reset').addEventListener('click', () => {
            timerComponent.resetTime();
            smsfinish.style.display = 'none';
        });

        timerComponent.addEventListener('endTime', () => {
            smsfinish.style.display = 'block';
            //Sonido
            const soundsComponent = new SoundsComponent();
            this.appendChild(soundsComponent);
            soundsComponent.playSonidoMp3();
        });
    }
}

customElements.define('timer-player-component', TimerPlayerComponent);
