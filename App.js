(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const controller = new Controller();
    const cDetector = new CollisionDetector();
    const road = new Road();
    const car = new Car(controller);
    const world = new World(ctx, controller, cDetector, {
        after: (world) => {
            if (Math.random() > 0.96) {
                world.add(new Obstacle());
            }
            if (!world.objects.has(car)) return 'stop';
        }
    });

    world.add(road);
    world.add(car);

    world.run();
})();