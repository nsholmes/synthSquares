import * as p5 from 'p5';
import { Ball } from 'src/app/p5Utilities/classes/ball';
import { Grid } from 'src/app/p5Utilities/classes/grid';
import { IGrid } from 'src/app/p5Utilities/models/grid.model';

import { Component, OnInit } from '@angular/core';

import { BoardLevels } from './board.levels';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private multiplier = 30;
  canvasWidth = 800;
  canvasHeight = 600;

  levels: BoardLevels = new BoardLevels();

  // reflectors: Reflector[] = this.levels.level1();

  gridConfig: IGrid = {
    rowCount: 10,
    colCount: 10,
    cellWidth: 50,
    cellHeight: 50,
    cellPadding: 5,
    cellBorderWidth: 2
  };
  grid: Grid = new Grid(this.gridConfig);

  board: p5;
  balls: Ball[] = [];
  edgeHit = false;
  launchPos: p5.Vector;

  conf = {
    xPosition: 0,
    xVelocity: 10,
    yPosition: 0,
    yVelocity: 20,
    diameter: 15,
    color: { r: 225, g: 225, b: 225, a: 225 }
  };


  constructor() { }

  ngOnInit() {

    const sketch = s => {
      let canvas;

      s.setup = () => {
        canvas = s.createCanvas(this.canvasWidth, this.canvasHeight);
        canvas.parent('game-board');
        this.launchPos = this.board.createVector(this.board.width / 2, this.board.height - this.conf.diameter / 2);
        this.grid.display(s);
        // this.board.noLoop();
      };

      s.draw = () => {
        
        s.background(0);
        for (const bumper of this.grid.reflectors) {
          bumper.display(s);
        }
        this.balls.forEach((ball, i) => {
          if (ball.config.color.a > 0) {
            ball.display(s);
            ball.move(s);
            this.grid.reflectors.forEach(refl => {
              if (refl.active) {
                const hit = ball.hitReflector(refl);
                if (hit) {
                  refl.intersected();
                }
              }
            });

            ball.hitBottomBorder();
          } else {
            this.balls.splice(i, 1);
          }
        });
      };

      s.mouseClicked = (ev) => {
        const mouseV = this.board.createVector(
          this.board.mouseX - this.launchPos.x,
          this.board.height - this.board.mouseY
        );

        const ball = new Ball(this.conf);
        ball.pos = this.board.createVector(this.launchPos.x, this.launchPos.y);
        mouseV.normalize();
        mouseV.mult(this.multiplier);

        ball.vel = this.board.createVector(mouseV.x, mouseV.y);

        this.balls.push(ball);
      };

      s.keyPressed = (ev) => {
        console.log(ev.keyCode);
        switch (ev.keyCode) {
          case 37:
            console.log('Left key');
            break;
          case 39:
            console.log('Right key');
            break;
          case 32:
            console.log('spacebar');
            break;
          default:
            break;
        }
      };
    };

    this.board = new p5(sketch);
  }

  clearClicked(ev: MouseEvent) {
    console.log(ev);
  }

  stopClicked(ev: MouseEvent) {
    console.log(ev);
  }

  playClicked(ev: MouseEvent) {
    console.log(ev);
  }

  restartClicked(ev: MouseEvent) {
    console.log(ev);
  }
}
