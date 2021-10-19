class Obstacle  extends BaseObject {

    kindMap = {
        0: { w: 102, h: 44},
        1: { w: 95, h: 43},
        2: { w: 72, h: 38},
    }

    constructor(lane) {
        super();
        this.lane = lane;
        this.kind = Math.random() * 2 >> 0;
        this.x = 640 + this.kindMap[this.kind].w;
        this.speed = ((lane < 3) ? 1 : -1) * (100 + Math.random() * 300 >> 0); // pix/sec
        this.img = document.getElementById(`car${this.kind}`);
    }

    get position() {
        const { w, h } = this.kindMap[this.kind]
        return {
            x: this.x,
            lane: this.lane,
            h,
            w
        };
    }

    tick(delegate) {
        const { dX } = delegate(this.speed);
        this.x += dX;
    }

    draw(ctx) {
        const {w, h} = this.position;
        let m = 1;
        if (this.lane >= 3) {
            m = -1;
            ctx.save();
            ctx.scale(-1, 1);
        }
        ctx.drawImage(this.img, 0, 0, m * w, h);
        if (this.lane >= 3) {
            ctx.restore();
        }
    }

    after() {
        const w = this.kindMap[this.kind].w;
        if (this.lane < 3) {
            if (this.x < -w) return 'dead';
        } else {
            if (this.x > 2 * 640 || this.x < -w) return 'dead';
        }
    }

    toString() {
        return `${super.toString()} Speed: ${this.speed}, Lane: ${this.lane}, X: ${this.x}`;
    }
}