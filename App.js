(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const controller = new Controller();
    const cDetector = new CollisionDetector();
    const road = new Road();
    const car = new Car(controller);
    const usedLanes = [];
    const candidates = [];
    const world = new World(ctx, controller, cDetector, {
        after: (world) => {
            if (Math.random() > 0.955) {
                world.objects.forEach((o) => {
                    if (o.alive && !(o instanceof Car)) {
                        usedLanes.push(o.position.lane);
                    }
                })
                for (let i = 0; i < lanes; i++) {
                    if (!usedLanes.includes(i)) {
                        candidates.push(i);
                    }
                }
                if (candidates.length > 0) {
                    world.add(new Obstacle(candidates[Math.random() * (candidates.length - 1) >> 0]));
                }
                usedLanes.length = 0;
                candidates.length = 0;
            }
            if (!world.objects.has(car)) return 'stop';
        }
    });

    world.add(road);
    world.add(car);

    world.run();
})();