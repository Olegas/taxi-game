class CollisionDetector {
    detect(objects) {
        const all = [...objects];
        const car = all.find((i) => i instanceof Car);
        const other = all.filter((i) => i !== car);

        const {x: cX, lane: cLane, w: cW} = car.position;
        const cX2 = cX + cW;
        const intersectingWithCar = new Set();
        other.find((o) => {
            if (o.alive) {
                let {x, w, lane} = o.position;
                let x2 = x + w;
                if (x2 < x) {
                    [x, x2] = [x2, x];
                }
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