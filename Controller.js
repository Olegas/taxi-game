class Controller {
    constructor() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.position = {
            x: 0,
            lane: 6
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
            this.position.lane = Math.min(lanes, this.position.lane + 1);
        } else if (e.code === 'ArrowUp') {
            this.position.lane = Math.max(-1, this.position.lane - 1);
        } else if (e.code === 'ArrowRight') {
            this._dA++;
        } else if (e.code === 'ArrowLeft') {
            this._dA--;
        }
    }
}