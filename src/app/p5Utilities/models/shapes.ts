import { IColor } from './utils';

export interface ICircle {
    xPosition: number;
    xVelocity: number;

    yPosition: number;
    yVelocity: number;

    diameter: number;

    color: IColor;
}
