const w = 87;
const h = 41;

class Car extends BaseObject {
    get assetFile() {
        return 'images/forward.svg';
    }

    constructor(controller) {
        super();
        this.controller = controller;
    }

    get position() {
        const { lane } = this.controller.position;
        return {
            x: 100,
            lane,
            w,
            h
        };
    }

    toString() {
        const { lane } = this.controller.position;
        return `${super.toString()} Lane: ${lane}`;
    }
}