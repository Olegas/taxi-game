class BaseObject {
    tick() {}
    after() {}
    toString() {
        return this.constructor.name;
    }

    alive = true;
}