import * as p5 from 'p5';

export class Reflector {
    pos: p5.Vector;
    width: number;
    height: number;
    timesHit = 0;
    private fillColor = '#fff';
    private fillColorArr = ['#fff', '#FF6F61', '#DD4124', '#88B04B', '#92A8D1'];

    constructor(w: number, h: number) {
        this.height = h;
        this.width = w;
    }

    intersected() {
        console.log('');
        this.fillColor = this.fillColorArr[Math.floor(Math.random() * this.fillColorArr.length)];
    }

    display(sketch) {
        sketch.fill(this.fillColor);
        sketch.noStroke();
        sketch.rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}
