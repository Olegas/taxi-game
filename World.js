const fps = 60;

class World {
    speed = 10; // pixels/second

    constructor(ctx, controller, collisionDetector, callbacks) {
        this.laneW = roadSize / lanes;
        this.callbacks = callbacks;
        this.collisionDetector = collisionDetector;
        this.ctx = ctx;
        this.objects = new Set();
        this.controller = controller;
        this.t = 0;
        this.a = 0; // pixels/second2
        this.log = document.getElementById('log');
        this.fps = document.getElementById('fps');
        this.frameCounter = 0;
        this.tFPS = [];
        this.fpsInterval = setInterval(() => {
            if (this.tFPS.length === 2) {
                const [b, e] = this.tFPS;
                const t = (e - b) / 1000;
                this.fps.textContent = `FPS: ${Math.round(this.frameCounter / t)}`;
                this.tFPS.length = 0;
                this.frameCounter = 0;
            }
        }, 1000);
    }

    add(object) {
        this.objects.add(object);
    }

    run() {
        if (this.t) {
            const { after, stop } = this.callbacks;
            this.objects.forEach((o) => {
                if (o.after() === 'dead') {
                    this.objects.delete(o);
                }
            });
            if (after?.(this) === 'stop') {
                stop?.();
                return;
            }
        }

        requestAnimationFrame((time) => {
            this.tFPS[this.tFPS.length === 0 ? 0 : 1] = time;
            this.frameCounter++;
            const { canvas: { width, height }} = this.ctx;
            this.ctx.clearRect(0, 0, width, height);
            if (this.t) {
                const dT = time - this.t;
                const dA = this.controller.dA;
                this.a = this.a + dA;
                this.speed = Math.max(0, this.speed + this.a * dT);
                this.a = this.a / 2;
                this.a = Math.abs(this.a) < 0.05 ? 0 : this.a;
                const { tick } = this.callbacks;
                tick?.(this);
                this.objects.forEach((o) => {
                    o.tick((oSpeed) => {
                        const dX = -((this.speed + oSpeed) * dT / 1000);
                        return {
                            dX,
                            dY: 0
                        };
                    });
                });
                const intersections = this.collisionDetector.detect(this.objects);
                intersections.forEach((i) => this.objects.delete(i));
                this.objects.forEach((o) => {
                    const {x, lane, h} = o.position;
                    this.ctx.translate(x, roadOffset + this.laneW * lane + (lane > 2 ? 15 : 0) - h / 4);
                    o.draw(this.ctx);
                    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                });
            }
            this.t = time;
            this.log.textContent = `Time: ${this.t}\nAcceleration: ${this.a}\nSpeed: ${this.speed}\n`;
            this.log.textContent += [...this.objects].reduce((res, o) => `${res}${o}\n`, '');
            setTimeout(() => this.run(), 1000 / fps);
        });
    }
}