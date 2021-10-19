class BaseObject {

    constructor() {
        this.renderScript = [];
        if (this.assetFile) {
            fetch(this.assetFile)
                .then((res) => res.text())
                .then((text) => new window.DOMParser().parseFromString(text, "text/xml"))
                .then((xml) => {
                    const svg = xml.getElementsByTagName('svg')[0];
                    this.renderScript = [...xml.getElementsByTagName('path')].reduce((res, p) => {
                        const path = new Path2D(p.getAttribute('d'));
                        const fill = p.getAttribute('fill');
                        const fillRule = p.getAttribute('fill-rule');
                        const stroke = p.getAttribute('stroke');
                        if (stroke) {
                            res.push(['beginPath', []]);
                            res.push(['strokeStyle', stroke]);
                            res.push(['stroke', [path]]);
                            if (fill) {
                                res.push(['fillStyle', fill]);
                                res.push(['fill', [fillRule]]);
                            }
                        } else {
                            res.push(['beginPath', []]);
                            res.push(['fillStyle', fill]);
                            res.push(['fill', [path, fillRule]]);
                        }
                        return res;
                    }, [
                        ['save', []],
                        ['scale', [w / +svg.getAttribute('width'), h / +svg.getAttribute('height')]]
                    ]);
                    this.renderScript.push(['restore', []]);
                })
        }
    }

    tick() {}
    after() {}
    toString() {
        return this.constructor.name;
    }

    draw(ctx) {
        if (this.renderScript) {
            this.renderScript.forEach((i) => {
                const [method, arg] = i;
                if (arg instanceof Array) {
                    ctx[method].apply(ctx, arg);
                } else {
                    ctx[method] = arg;
                }
            });
        }
    }

    alive = true;
}