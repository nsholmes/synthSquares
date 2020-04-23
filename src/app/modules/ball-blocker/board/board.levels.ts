import * as p5 from 'p5';
import { Reflector } from 'src/app/p5Utilities/classes/reflector';

export class BoardLevels {

    p5Ref = new p5(() => { });

    bumperCount = 0;
    constructor() { }

    level1(): Reflector[] {
        const bumperCount = 4;
        const width = 30;
        const height = 30;
        const retVal: Reflector[] = [];

        for (let i = 0; i < bumperCount; i++) {
            const relf = new Reflector(width, height);
            retVal.push(relf);
        }

        retVal[0].pos = this.p5Ref.createVector(100, 100);
        retVal[1].pos = this.p5Ref.createVector(200, 200);
        retVal[2].pos = this.p5Ref.createVector(300, 300);
        retVal[3].pos = this.p5Ref.createVector(400, 400);

        this.bumperCount = bumperCount;
        return retVal;
    }

    level2(): Reflector[] {
        const bumperCount = 7;
        const width = 30;
        const height = 30;
        const retVal: Reflector[] = [];

        for (let i = 0; i < bumperCount; i++) {
            const relf = new Reflector(width, height);
            retVal.push(relf);
        }

        retVal[0].pos = this.p5Ref.createVector(100, 100);
        retVal[1].pos = this.p5Ref.createVector(200, 200);
        retVal[2].pos = this.p5Ref.createVector(300, 300);
        retVal[3].pos = this.p5Ref.createVector(400, 400);
        retVal[4].pos = this.p5Ref.createVector(500, 300);
        retVal[5].pos = this.p5Ref.createVector(600, 200);
        retVal[6].pos = this.p5Ref.createVector(700, 100);

        this.bumperCount = bumperCount;
        return retVal;
    }
}
