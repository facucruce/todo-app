import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SecondsToMinutesPipe } from '../pipes/seconds-to-minutes.pipe';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    TimerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    PipesModule
  ],
  exports: [
    TimerComponent
  ],
  providers: [SecondsToMinutesPipe],
})
export class ComponentsModule { }
