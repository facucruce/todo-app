import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../interfaces/task';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: Priority | null): string {
    switch (value) {
      case Priority.Low:
        return 'Low';
      case Priority.Medium:
        return 'Medium';
      case Priority.High:
        return 'High';
      default:
        return 'Unknown';
    }
  }

}
