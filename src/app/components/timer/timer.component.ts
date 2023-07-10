import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  timerRunning = false;
  @Input() spendTime!: number;
  @Input() totalTime!: number;
  @Output() stopChange = new EventEmitter<number>();

  get spendTimePercentage(): number {
    if (this.remainingTime) {
      return (this.remainingTime * 100) / this.totalTime;
    }
    return 0;
  }

  get remainingTime(): number {
    if (this.spendTime) {
      return this.totalTime - this.spendTime
    }
    return this.totalTime;
  }

  startTimer() {
    this.timerRunning = true;
    this.updateTimer();
  }

  stopTimer() {
    this.timerRunning = false;
    this.stopChange.emit(this.spendTime);
  }

  updateTimer() {
    setTimeout(() => {
      if (this.timerRunning && this.remainingTime && this.remainingTime > 0) {
        this.spendTime++;
        this.updateTimer();
      } else {
        this.stopTimer();
      }
    }, 1000);
  }
}
