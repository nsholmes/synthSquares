import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule],
  exports: [BoardComponent]
})
export class BallBlockerModule { }
