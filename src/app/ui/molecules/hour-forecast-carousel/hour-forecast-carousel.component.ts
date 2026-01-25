import { Component, input } from '@angular/core';
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

  constructor(private datePipe: DatePipe) { }

  formatHour(dt: number): string {
    return this.datePipe.transform(dt * 1000, 'HH:mm') || '';
  }
}
