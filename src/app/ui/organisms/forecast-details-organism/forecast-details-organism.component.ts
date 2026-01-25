import { Component, computed, input, signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ForecastInfo } from '@shared/interfaces/forecast.interfaces';
import { WeatherDetail } from '@shared/interfaces/weather-detail.interfaces';
import { HourForecastCarouselComponent } from '../../molecules/hour-forecast-carousel/hour-forecast-carousel.component';
import { WeatherDetailsCardComponent } from '../../molecules/weather-details-card/weather-details-card.component';

@Component({
    selector: 'app-forecast-details-organism',
    standalone: true,
    imports: [CommonModule, TranslatePipe, HourForecastCarouselComponent, WeatherDetailsCardComponent],
    templateUrl: './forecast-details-organism.component.html',
    styleUrls: ['./forecast-details-organism.component.scss'],
    providers: [DatePipe]
})
export class ForecastDetailsOrganismComponent {
    title = input<string>('');
    details = input<WeatherDetail[]>([]);
    forecasts = input<ForecastInfo[]>([]);
    cityName = input<string>('');
    currentTemp = input<number>(0);
    lang = input<string>('en-GB');

    private datePipe = inject(DatePipe);

    displayForecasts = computed(() => {
        return this.forecasts();
    });

    currentDate = computed(() => {
        const forecasts = this.forecasts();
        if (forecasts.length > 0) {
            // Use the lang input for locale, defaulting to en-GB
            return this.datePipe.transform(forecasts[0].dt * 1000, 'EEEE, d MMMM', '', this.lang());
        }
        return '';
    });

    getGridClass(index: number): string {
        const total = this.details().length;
        const remainder = total % 3;
        const lastRowStartIndex = total - (remainder || 3);

        let classes = 'col-12 col-md-4';

        if (index >= lastRowStartIndex) {
            if (remainder === 1) {
                classes = 'col-12';
            } else if (remainder === 2) {
                classes = 'col-6 col-md-6';
            }
        }

        return classes;
    }

}
