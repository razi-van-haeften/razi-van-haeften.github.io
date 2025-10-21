import { Vec2 } from "../models/Vec2.js";
export class Player {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.position = new Vec2(0, 0, 0);
    }
}