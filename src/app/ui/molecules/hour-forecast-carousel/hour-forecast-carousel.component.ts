import { Component, input, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ForecastInfo } from '@shared/interfaces/forecast.interfaces';
import { VerticalHourForecastComponent } from '../vertical-hour-forecast/vertical-hour-forecast.component';

@Component({
  selector: 'app-hour-forecast-carousel',
  templateUrl: './hour-forecast-carousel.component.html',
  styleUrls: ['./hour-forecast-carousel.component.scss'],
  standalone: true,
  imports: [CommonModule, VerticalHourForecastComponent],
  providers: [DatePipe]
})
export class HourForecastCarouselComponent {
  forecasts = input.required<ForecastInfo[]>();
  title = input<string>("");
  lang = input<string>('en-GB');

  groupedForecasts = computed(() => {
    const list = this.forecasts();
    if (!list || list.length === 0) return [];

    const groups: { day: string, items: ForecastInfo[] }[] = [];
    list.forEach(item => {
      const dayName = this.datePipe.transform(item.dt * 1000, 'EEEE', '', this.lang()) || '';
      const dayDate = this.datePipe.transform(item.dt * 1000, 'd MMM', '', this.lang()) || '';
      const dayLabel = `${dayName}, ${dayDate}`;

      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.day === dayLabel) {
        lastGroup.items.push(item);
      } else {
        groups.push({ day: dayLabel, items: [item] });
      }
    });
    return groups;
  });

  constructor(private datePipe: DatePipe) { }

  formatHour(dt: number): string {
    return this.datePipe.transform(dt * 1000, 'HH:mm') || '';
  }
}
