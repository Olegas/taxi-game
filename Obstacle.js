class Obstacle  extends BaseObject {

    kindMap = {
        0: { w: 102, h: 44},
        1: { w: 95, h: 43},
        2: { w: 72, h: 38},
    }

    constructor() {
        super();
        this.lane = Math.round(Math.random() * 4);
        this.x = 580;
        this.speed = Math.random() * 300 >> 0; // pix/sec
        this.kind = Math.random() * 1 >> 0;
    }

    get position() {
        return {
            x: this.x,
            lane: this.lane,
            ...this.kindMap[this.kind]
        };
    }

    tick(delegate) {
        const { dX } = delegate(this.speed);
        this.x += dX;
    }

    draw(ctx) {
        const {w, h} = this.position;
        ctx.drawImage(document.getElementById(`car${this.kind}`), 0, 0, w, h);
    }

    after() {
        if (this.x < -96) return 'dead';
    }

    toString() {
        return `${super.toString()} Speed: ${this.speed}, Lane: ${this.lane}`;
    }
}