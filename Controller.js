class Controller {
    constructor() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.position = {
            x: 0,
            y: 0
        }
        this._dA = 0;
    }

    get dA() {
        const res = this._dA;
        this._dA = 0;
        return res;
    }

    handleKeyDown(e) {
        if (e.code === 'ArrowDown') {
            this.position.x = Math.min(2, this.position.x + 1);
        } else if (e.code === 'ArrowUp') {
            this.position.x = Math.max(-2, this.position.x - 1);
        } else if (e.code === 'ArrowRight') {
            this._dA++;
        } else if (e.code === 'ArrowLeft') {
            this._dA--;
        }
    }
}