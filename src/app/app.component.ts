import { Component, OnInit } from '@angular/core';

import { Bubble } from './p5Utilities/classes/bubble';
import { ICircle } from './p5Utilities/models/shapes';
import { IColor } from './p5Utilities/models/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'p5Project1';
  canvas: any;
  sw = 2;
  isStopped = false;
  tempBubbles: Bubble[] = [];
  colorSetting: IColor = { r: 255, g: 255, b: 255, a: 255 };
  defaultBubble: ICircle = {
    xPosition: 0,
    xVelocity: 10,
    yPosition: 0,
    yVelocity: 5,
    diameter: 5,
    color: this.colorSetting
  };
  bubbleConfigs: Bubble[] = [
    new Bubble(this.defaultBubble)
  ];

  ngOnInit() {

  }

  clearClicked(ev) {
    console.log(ev.target);
    this.canvas.background(0);
    if (this.isStopped) {
      this.bubbleConfigs = [];
      this.tempBubbles = [];
    }
  }

  stopClicked(ev) {
    this.isStopped = true;
    this.tempBubbles = [...this.bubbleConfigs];
    this.bubbleConfigs = [];
  }
  playClicked(ev) {
    if (this.isStopped) {
      this.bubbleConfigs = this.tempBubbles.length > 0
        ? [...this.tempBubbles]
        : [new Bubble()];
    }
    this.isStopped = false;

  }
  restartClicked(ev) {
    this.isStopped = false;
    this.canvas.background(0);
    this.tempBubbles = [];
    this.bubbleConfigs = [new Bubble()];
  }

  setRed(ev) {
    this.colorSetting.r = ev.target.value;
  }

  setGreen(ev) {
    this.colorSetting.g = ev.target.value;
  }

  setBlue(ev) {
    this.colorSetting.b = ev.target.value;
  }
}
