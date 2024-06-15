

export class TimerPartComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <link rel="stylesheet" href="./../../src/css/style.css">
            <div class="tiempo">
                <span class="time-part horas"></span>
                <span>:</span>
                <span class="time-part minutos"></span>
                <span>:</span>
                <span class="time-part segundos"></span>
            </div>
        `;
        this.segundos = Number(this.getAttribute('start')) || 10;
        this.interval = null;
        this.updateTime();
    }

    startTime() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.segundos--;
                if (this.segundos <= 0) {
                    clearInterval(this.interval);
                    this.dispatchEvent(new CustomEvent('endTime', { bubbles: true }));
                }
                this.updateTime();
            }, 1000);
        }
    }

    pauseTime() {
        clearInterval(this.interval);
        this.interval = null;
    }

    resetTime() {
        this.pauseTime();
        this.segundos = Number(this.getAttribute('start')) || 10;
        this.updateTime();
    }

    updateTime() {
        const horas = ('0' + Math.floor(this.segundos / 3600)).slice(-2);
        const minutos = ('0' + Math.floor((this.segundos % 3600) / 60)).slice(-2);
        const segundos = ('0' + (this.segundos % 60)).slice(-2);
        this.shadowRoot.querySelector('.horas').textContent = horas;
        this.shadowRoot.querySelector('.minutos').textContent = minutos;
        this.shadowRoot.querySelector('.segundos').textContent = segundos;
    }
}

customElements.define('timer-part-component', TimerPartComponent);
