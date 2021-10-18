const w = 60;
const h = 40;

class Car extends BaseObject {
    constructor(controller) {
        super();
        this.controller = controller;
        this.lane = 2;
    }

    get position() {
        const { x: xOffset } = this.controller.position;
        const laneW = (480 - 20 * 2) / 5;
        return {
            x: 0,
            y: 20 + (this.lane + xOffset) * laneW + (laneW - w) / 2,
            w,
            h
        };
    }

    draw(ctx) {
        const { x, y } = this.position;
        ctx.fillRect(x, y, w, h);
    }

    toString() {
        const { x: xOffset } = this.controller.position;
        return `${super.toString()} Lane: ${this.lane + xOffset}`;
    }
}