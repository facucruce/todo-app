import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToMinutesPipe } from './seconds-to-minutes.pipe';
import { PriorityPipe } from './priority.pipe';

@NgModule({
  declarations: [
    SecondsToMinutesPipe,
    PriorityPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SecondsToMinutesPipe,
    PriorityPipe
  ]
})
export class PipesModule { }
