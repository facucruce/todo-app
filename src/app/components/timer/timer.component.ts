import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  timerRunning = false;
  @Input() remainingTime!: number;
  @Output() stopChange = new EventEmitter<number>();
  totalTime = 30 * 60; // 30 minutes in seconds

  get remainingTimePercentage(): number {
    if(this.remainingTime) {
      return (this.remainingTime / this.totalTime) * 100;
    }
    return 0;
  }

  startTimer() {
    this.timerRunning = true;
    this.updateTimer();
  }

  stopTimer() {
    this.timerRunning = false;
    this.stopChange.emit(this.remainingTime)
  }

  updateTimer() {
    setTimeout(() => {
      if (this.timerRunning && this.remainingTime && this.remainingTime > 0) {
        this.remainingTime--;
        this.updateTimer();
      } else {
        this.stopTimer();
      }
    }, 1000);
  }
}
