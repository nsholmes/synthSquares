import * as p5 from 'p5';
import { Ball } from 'src/app/p5Utilities/classes/ball';
import { Reflector } from 'src/app/p5Utilities/classes/reflector';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  canvasWidth = 550;
  canvasHeight = 700;

  reflectors: Reflector[] = [];

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
        for (let i = 0; i < 6; i++) {
          const refl = new Reflector(this.board.random(50, 70), this.board.random(50, 70));
          refl.pos = this.board.createVector(this.board.random(this.canvasWidth), this.board.random(this.canvasHeight));
          refl.display(s);
          this.reflectors.push(refl);
        }
      };

      s.draw = () => {
        s.background(0);
        this.balls.forEach((ball, i) => {

          if (ball.config.color.a > 0) {
            ball.display(s);
            ball.move(s);
            this.reflectors.forEach(refl => {
              ball.hitReflector(refl);
            });

            ball.hitBottomBorder();
          } else {
            this.balls.splice(i, 1);
          }
        });
        this.reflectors.forEach(refl => {
          refl.display(s);
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
        mouseV.mult(15);

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
}
