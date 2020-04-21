export enum BoardEdge {
    NONE = 0,
    RIGHT = 1,
    LEFT = 2,
    BOTTOM = 3,
    TOP = 4
}
export type EdgePosition = 'Center' | 'Right' | 'Left' | 'Bottom' | 'Top';
export function EdgeDetected(
    xpos,
    ypos,
    canvasWidth,
    canvasHeight
    ): EdgePosition {
    if (xpos > canvasWidth) {
        return 'Right';
    }
    if (xpos < 0) {
        return 'Left';
    }

    if (ypos > canvasHeight) {
        return 'Bottom';
    }
    if (ypos < 0) {
        return 'Top';
    }
    return 'Center';
}
