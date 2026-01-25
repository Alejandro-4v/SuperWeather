import { Component, computed, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherIconPipe } from '@pipes/weather-icon.pipe';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss'],
  standalone: true,
  imports: [CommonModule, WeatherIconPipe],
  providers: [DatePipe],
  host: {
    'class': 'glass-pill d-flex align-items-center rounded-pill overflow-hidden'
  }
})
export class DailyForecastComponent {
  dt = input.required<number>();
  icon = input.required<string>();
  description = input.required<string>();
  minTemp = input.required<number>();
  maxTemp = input.required<number>();

  constructor(private datePipe: DatePipe) { }

  weekday = computed(() => {
    return this.datePipe.transform(this.dt() * 1000, 'EEEE') || '';
  });

  capitalizedDescription = computed(() => {
    const desc = this.description();
    if (!desc) return '';
    return desc.charAt(0).toUpperCase() + desc.slice(1);
  });
}
