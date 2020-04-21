import { ICircle } from '../models/shapes';
import { EdgePosition } from '../mods/object-detection';

export class Bubble {
    private defaultConfig: ICircle = {
        xPosition: 0,
        xVelocity: 10,
        yPosition: 0,
        yVelocity: 5,
        diameter: 5,
        color: {r: 225, g: 225, b: 225, a: 225}
    };
    protected config = {} as ICircle;

    constructor(configuration?: ICircle) {
        this.config = configuration ? configuration : this.defaultConfig;
    }

    get x() {
        return this.config.xPosition;
    }
    set x(xPosition: number) {
        this.config.xPosition = xPosition;
    }

    get y() {
        return this.config.yPosition;
    }
    set y(yPosition: number) {
        this.config.yPosition = yPosition;
    }

    get d() {
        return this.config.diameter;
    }
    set d(diameter: number) {
        this.config.diameter = diameter;
    }

    move(sketch, edge?: EdgePosition) {
        if (this.config.xPosition > sketch.width) {
            this.config.xVelocity *= -1;
        } else if (this.config.xPosition <= 0) {
            this.config.xVelocity *= -1;
            this.config.xPosition = 0;
        }
        if (this.config.yPosition > sketch.height) {
            this.config.yVelocity *= -1;
        } else if (this.config.yPosition <= 0) {
            this.config.yVelocity *= -1;
            this.config.yPosition = 0;
        }

        this.config.xPosition += this.config.xVelocity;
        this.config.yPosition += this.config.yVelocity;
    }

    display(sketch) {
        sketch.noFill();
        sketch.stroke(this.config.color.r, this.config.color.g, this.config.color.b, this.config.color.a);
        sketch.ellipse(this.x, this.y, this.d);
    }
}
