function intersects(a, b) {
    const yNotIntersects = (a.y > b.y2 || a.y2 < b.y);
    const xNotIntersects = (a.x > b.x2 || a.x2 < b.x);
    if (yNotIntersects) return false;
    if (xNotIntersects) return false;
    return true;
}

class CollisionDetector {
    detect(objects) {
        const all = [...objects];
        const car = all.find((i) => i instanceof Car);
        const other = all.filter((i) => i !== car);

        const {x: cX, y: cY, w: cW, h: cH} = car.position;
        const [ cX2, cY2 ] = [ cX + cW, cY + cH ];
        const intersectingWithCar = new Set();
        other.find((o) => {
            if (o.alive) {
                const {x, y, w, h} = o.position;
                const [x2, y2] = [x + w, y + h];

                if (intersects({x: cX, y: cY, x2: cX2, y2: cY2}, {x, y, x2, y2})) {
                    intersectingWithCar.add(o);
                    intersectingWithCar.add(car);
                }
            }
        });
        return intersectingWithCar;
    }
}