const w = 87;
const h = 41;

class Car extends BaseObject {
    constructor(controller) {
        super();
        this.controller = controller;
    }

    get position() {
        const { lane } = this.controller.position;
        return {
            x: 10,
            lane,
            w,
            h
        };
    }

    draw(ctx) {
        /*ctx.fillRule = 'evenodd';
        ctx.clipRule = 'evenodd';
        ctx.fillStyle = 'white'
        ctx.stroke(new Path2D('M68.673 1.67603C61.322 1.67603 58.865 3.09703 58.865 7.34903C58.865 11.601 61.322 13.022 68.673 13.022C69.836 13.022 70.876 12.987 71.804 12.91C76.74 12.502 78.481 10.929 78.481 7.34903C78.481 3.09703 76.024 1.67603 68.673 1.67603Z'));
        ctx.fill();
        ctx.fillStyle = '#263238';
        ctx.strokeWidth = 1.263;
        ctx.strokeLinecap = 'round';
        ctx.strokeLinejoin = 'round';
        ctx.stroke(new Path2D('M68.673 1.67603C61.322 1.67603 58.865 3.09703 58.865 7.34903C58.865 11.601 61.322 13.022 68.673 13.022C69.836 13.022 70.876 12.987 71.804 12.91C76.74 12.502 78.481 10.929 78.481 7.34903C78.481 3.09703 76.024 1.67603 68.673 1.67603Z'));
        ctx.fill();*/
        ctx.drawImage(document.getElementById('car'), 0, 0, w, h);
    }

    toString() {
        const { lane } = this.controller.position;
        return `${super.toString()} Lane: ${lane}`;
    }
}