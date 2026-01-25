import { Component, computed, input } from '@angular/core';
import { WeatherIconPipe } from '@pipes/weather-icon.pipe';

@Component({
  selector: 'app-horizontal-hour-forecast',
  templateUrl: './horizontal-hour-forecast.component.html',
  styleUrls: ['./horizontal-hour-forecast.component.scss'],
  standalone: true,
  imports: [WeatherIconPipe],
  host: {
    'class': 'glass-pill d-flex align-items-center rounded-pill overflow-hidden'
  }
})
export class HorizontalHourForecastComponent {
  hour = input.required<string>();
  icon = input.required<string>();
  description = input.required<string>();
  temp = input.required<number>();

  capitalizedDescription = computed(() => {
    const desc = this.description();
    if (!desc) return '';
    return desc.charAt(0).toUpperCase() + desc.slice(1);
  });
}
