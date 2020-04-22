import * as p5 from 'p5';

export class Reflector {
    pos: p5.Vector;
    width: number;
    height: number;
    timesHit = 0;

    constructor(w: number, h: number) {
        this.height = h;
        this.width = w;
    }

    display(sketch) {
        sketch.fill(255);
        sketch.noStroke();
        sketch.rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}
