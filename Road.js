const dim = 20;
const num = 4;

class Road extends BaseObject  {
    constructor() {
        super();
        this.offset = 0;
    }

    alive = false;

    tick(delegate) {
        const { dX } = delegate(0);
        this.offset = (this.offset + dX) % (dim * num);
    }

    get position() {
        return {
            x: 0,
            lane: 0,
            h: 0
        }
    }

    draw(ctx) {
        /*const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        const offsetToNext = dim * num;
        for(let i = 0; i < 2; i++) {
            for(let j = -(num - 1); j < (w / dim) / num; j++) {
                ctx.fillRect(this.offset + offsetToNext * j, i === 0 ? 0 : h - dim, dim, dim);
            }
        }*/
        ctx.strokeStyle = 'white';
        ctx.setLineDash([5, 15]);
        for (let i = 1; i < lanes; i++) {
            if (i === 3) continue;
            const off = i > 3 ? 10 : 0;
            ctx.moveTo(0,(roadSize / lanes) * i + off);
            ctx.lineTo(ctx.canvas.width, (roadSize / lanes) * i + off);
        }
        ctx.stroke();
    }

    toString() {
        return `${super.toString()} Offset: ${this.offset}`;
    }
}