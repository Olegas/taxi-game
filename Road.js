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

    draw(ctx) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.strokeStyle = 'black';
        const offsetToNext = dim * num;
        for(let i = 0; i < 2; i++) {
            for(let j = -(num - 1); j < (w / dim) / num; j++) {
                ctx.fillRect(this.offset + offsetToNext * j, i === 0 ? 0 : h - dim, dim, dim);
            }
        }
    }

    toString() {
        return `${super.toString()} Offset: ${this.offset}`;
    }
}