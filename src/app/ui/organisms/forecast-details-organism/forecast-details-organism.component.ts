import { Component, computed, input, signal } from '@angular/core';
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
    styleUrls: ['./forecast-details-organism.component.scss']
})
export class ForecastDetailsOrganismComponent {
    title = input<string>('');
    details = input<WeatherDetail[]>([]);
    forecasts = input<ForecastInfo[]>([]);

    selectedDayIndex = signal(0);

    availableDays = computed(() => {
        const items = this.forecasts();
        if (items.length === 0) return [];

        const dayLabels: string[] = [];
        const seenDates = new Set<string>();

        items.forEach(f => {
            const date = new Date(f.dt * 1000).toDateString();
            if (!seenDates.has(date)) {
                seenDates.add(date);
                dayLabels.push(date === new Date().toDateString() ? 'Today' : date);
            }
        });

        return dayLabels;
    });

    displayForecasts = computed(() => {
        const items = this.forecasts();
        if (items.length === 0) return [];

        const groups: ForecastInfo[][] = [];
        let currentGroup: ForecastInfo[] = [];
        let lastDate = '';

        items.forEach(f => {
            const date = new Date(f.dt * 1000).toDateString();
            if (date !== lastDate && currentGroup.length > 0) {
                groups.push(currentGroup);
                currentGroup = [];
            }
            currentGroup.push(f);
            lastDate = date;
        });
        if (currentGroup.length > 0) groups.push(currentGroup);

        return groups[this.selectedDayIndex()] || [];
    });

    getGridClass(index: number): string {
        const total = this.details().length;
        const remainder = total % 3;
        const lastRowStartIndex = total - (remainder || 3);

        let classes = 'col-6 col-md-4';

        if (index >= lastRowStartIndex) {
            if (remainder === 1) {
                classes = 'col-12';
            } else if (remainder === 2) {
                classes = 'col-6 col-md-6';
            }
        }

        return classes;
    }

    selectDay(index: number) {
        this.selectedDayIndex.set(index);
    }
}
