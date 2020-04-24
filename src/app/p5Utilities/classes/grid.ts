import { IGrid } from '../models/grid.model';
import { Reflector } from './reflector';

export class Grid {
    config: IGrid;
    reflectors: Reflector[] = [];
    constructor(gridConfig: IGrid) {
        this.config = gridConfig;
    }

    display(sketch) {
        const { rowCount, colCount, cellWidth, cellHeight, cellPadding, cellBorderWidth } = this.config;
        let x: number;
        let y: number;
        for (let i = 0; i < rowCount; i++) {
            y = i === 0 ? cellPadding : y + cellHeight + cellPadding;
            for (let j = 0; j < colCount; j++) {
                x = j === 0 ? cellPadding : x + cellWidth + cellPadding;
                const refl = new Reflector(cellWidth, cellHeight);
                refl.pos = sketch.createVector(x, y);
                this.reflectors.push(refl);
            }
        }
    }
}
