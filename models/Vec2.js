export class Vec2 {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    static add(a = new Vec2(), b = new Vec2()){
        return new Vec2(
            a.x + b.x,
            a.y + b.y
        );
    }
    static subtract(a = new Vec2(), b = new Vec2()){
        return new Vec2(
            a.x - b.x,
            a.y - b.y
        );
    }
    static multiply(a = new Vec2(), t = new Number()){
        return new Vec2(
            a.x * t,
            a.y * t
        );
    }
    static length(a = new Vec2()){
        return Math.hypot(a.x, a.y);
    }
    static unit(a = new Vec2()){
        const length = this.length(a);
        return new Vec2(
            a.x / length,
            a.y / length
        );
    }
    static dot(a = new Vec2(), b = new Vec2()){
        return (a.x * b.x) + (a.y * b.y);
    }
    static toBuffer(a = new Vec2()){
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setFloat32(0, a.x, true);
        view.setFloat32(4, a.y, true);
        return buffer;
    };
    static fromBuffer(buffer = new ArrayBuffer()){
        const view = new DataView(buffer);
        return new Vec2(
            view.getFloat32(0, true),
            view.getFloat32(4, true)
        );
    }
    static log(a){
        console.log(`x: ${a.x}, y: ${a.y}`);
    }
}