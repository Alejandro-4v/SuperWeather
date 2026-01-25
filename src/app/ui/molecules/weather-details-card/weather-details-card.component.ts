import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-weather-details-card',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './weather-details-card.component.html',
  styleUrls: ['./weather-details-card.component.scss']
})
export class WeatherDetailsCardComponent {
  icon = input.required<string>();
  label = input.required<string>();
  value = input.required<string | number>();
}
