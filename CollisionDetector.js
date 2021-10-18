class CollisionDetector {
    detect(objects) {
        const all = [...objects];
        const car = all.find((i) => i instanceof Car);
        const other = []; //all.filter((i) => i !== car);

        const {x: cX, lane: cLane, w: cW} = car.position;
        const cX2 = cX + cW;
        const intersectingWithCar = new Set();
        other.find((o) => {
            if (o.alive) {
                const {x, lane, w} = o.position;
                const x2 = x + w;
                const xNotIntersects = (cX2 < x) || (cX > x2);
                const yNotIntersects = lane !== cLane;
                if (xNotIntersects || yNotIntersects) return;
                intersectingWithCar.add(o);
                intersectingWithCar.add(car);
            }
        });
        return intersectingWithCar;
    }
}