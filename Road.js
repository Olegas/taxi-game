const dim = 20;

class Road extends BaseObject  {
    constructor() {
        super();
        this.offset = 0;
    }

    alive = false;

    tick(delegate) {
        const { dX } = delegate(0);
        this.offset = (this.offset - dX) % dim;
    }

    get position() {
        return {
            x: 0,
            lane: 0,
            h: 0
        }
    }

    draw(ctx) {
        ctx.strokeStyle = 'white';
        ctx.save();
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        for (let i = 1; i < lanes; i++) {
            if (i === 3) continue;
            const off = i > 3 ? 10 : 0;
            ctx.moveTo(-this.offset,(roadSize / lanes) * i + off);
            ctx.lineTo(ctx.canvas.width, (roadSize / lanes) * i + off);
        }
        ctx.stroke();
        ctx.restore();
    }

    toString() {
        return `${super.toString()} Offset: ${this.offset}`;
    }
}