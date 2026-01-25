import { Component, input } from '@angular/core';
import { WeatherIconPipe } from '@pipes/weather-icon.pipe';

@Component({
  selector: 'app-vertical-hour-forecast',
  templateUrl: './vertical-hour-forecast.component.html',
  styleUrls: ['./vertical-hour-forecast.component.scss'],
  standalone: true,
  imports: [WeatherIconPipe],
  host: {
    'class': 'glass-card d-flex flex-column align-items-center p-2 rounded-4'
  }
})
export class VerticalHourForecastComponent {
  hour = input.required<string>();
  icon = input.required<string>();
  temp = input.required<number>();
}
