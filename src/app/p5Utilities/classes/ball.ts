import { ICircle } from '../models/shapes';
import { Reflector } from './reflector';

export class Ball {
    pos;
    vel;
    config: ICircle;
    radius: number;
    bottomHitCount = 0;
    didHitReflector = false;

    constructor(configuration?: ICircle) {
        this.config = { ...configuration };
        this.radius = this.config.diameter / 2;
    }

    move(sketch) {
        if (this.pos.y <= this.radius) {
            this.vel.y *= -1;
        }

        // hits bottom border
        if (this.pos.y > sketch.height - this.radius) {
            this.bottomHitCount += 1;
            this.vel.y *= -1;
        }

        if (this.pos.x <= this.radius || this.pos.x >= sketch.width - this.radius) {
            this.vel.x = this.vel.x *= -1;
        }
        this.pos.add(this.vel);
    }


    display(sketch) {
        sketch.fill(this.config.color.r, this.config.color.g, this.config.color.b, this.config.color.a);
        sketch.stroke(this.config.color.r, this.config.color.g, this.config.color.b, this.config.color.a);
        sketch.ellipse(this.pos.x, this.pos.y, this.config.diameter);
    }

    hitBottomBorder() {
        if (this.bottomHitCount > 1) {
            this.config.color = { r: 255, g: 0, b: 0, a: 255 };
        }
        if (this.bottomHitCount > 2) {
            this.config.color = { r: 155, g: 100, b: 0, a: 255 };
        }
        if (this.bottomHitCount > 3) {
            this.config.color = { r: 55, g: 255, b: 0, a: 255 };
        }
        if (this.bottomHitCount > 4) {
            this.config.color = { r: 0, g: 255, b: 100, a: 255 };
        }
        if (this.bottomHitCount > 5) {
            this.config.color = { r: 0, g: 155, b: 200, a: 100 };
        }
        if (this.bottomHitCount > 6) {
            this.config.color = { r: 0, g: 0, b: 0, a: 0 };
        }
    }

    hitReflector(other: Reflector): void {
        const { x, y } = this.pos;
        // For a rect

        // check left and right Edge
        if (x + this.radius + this.vel.x > other.pos.x &&
            x + this.vel.x < other.pos.x + other.width &&
            y + this.radius > other.pos.y &&
            y < other.pos.y + other.height) {
            this.vel.x *= -1;
        }

        // check top and bottom edge
        if (x + this.radius > other.pos.x &&
            x < other.pos.x + other.width &&
            y + this.radius + this.vel.y > other.pos.y &&
            y + this.vel.y < other.pos.y + other.height) {
            this.vel.y *= -1;
        }
    }
}
