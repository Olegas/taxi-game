class Obstacle  extends BaseObject {

    constructor() {
        super();
        this.lane = Math.round(Math.random() * 5);
        this.x = 580;
        this.d = 20;
        this.speed = Math.random() * 300 >> 0; // pix/sec
    }

    get position() {
        const laneW = (ctx.canvas.height - 20 * 2) / 5;
        return {
            x: this.x,
            y: 20 + this.lane * laneW + (laneW - this.d) / 2,
            w: this.d,
            h: this.d
        };
    }

    tick(delegate) {
        const { dX } = delegate(this.speed);
        this.x += dX;
    }

    draw(ctx) {
        const {x, y, w, h} = this.position;
        ctx.fillRect(x, y, w, h);
    }

    after() {
        if (this.x < 0) return 'dead';
    }

    toString() {
        return `${super.toString()} Speed: ${this.speed}, Lane: ${this.lane}`;
    }
}