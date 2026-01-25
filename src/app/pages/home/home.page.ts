import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonItem, IonSelect, IonSelectOption, IonSpinner, IonList, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline } from 'ionicons/icons';

import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SearchBarComponent } from '../../ui/molecules/search-bar/search-bar.component';
import { VerticalHourForecastComponent } from '../../ui/molecules/vertical-hour-forecast/vertical-hour-forecast.component';
import { HourForecastCarouselComponent } from '../../ui/molecules/hour-forecast-carousel/hour-forecast-carousel.component';
import { WeatherDetailsCardComponent } from '../../ui/molecules/weather-details-card/weather-details-card.component';
import { DailyForecastComponent } from '../../ui/molecules/daily-forecast/daily-forecast.component';
import { ForecastDetailsOrganismComponent } from '../../ui/organisms/forecast-details-organism/forecast-details-organism.component';
import { ForecastInfo } from '@shared/interfaces/forecast.interfaces';
import { WeatherDetail } from '@shared/interfaces/weather-detail.interfaces';
import { DailyForecast } from '@shared/interfaces/daily-forecast.interfaces';
import { WeatherService } from '../../services/weather.service';
import { GeocodingService } from '../../services/geocoding.service';
import { CurrentWeatherResponse } from '@shared/interfaces/weather.interfaces';
import { Geocoding } from '@shared/interfaces/geocoding.interfaces';
import { WEATHER_BACKGROUNDS, DEFAULT_BACKGROUND, BACKGROUND_BASE_PATH } from '../../shared/constants/weather-backgrounds.constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonItem, IonSelect, IonSelectOption, IonSpinner, TranslatePipe, SearchBarComponent, VerticalHourForecastComponent, DailyForecastComponent, HourForecastCarouselComponent, WeatherDetailsCardComponent, ForecastDetailsOrganismComponent, IonList, IonLabel, IonIcon],
})
export class HomePage implements OnInit {
  private weatherService = inject(WeatherService);
  private geocodingService = inject(GeocodingService);
  public translationService = inject(TranslationService);

  forecasts = signal<ForecastInfo[]>([]);
  weatherDetails = signal<WeatherDetail[]>([]);
  dailyForecasts = signal<DailyForecast[]>([]);
  searchResults = signal<Geocoding[]>([]);
  cityName = signal<string>('Madrid');
  currentTemp = signal<number>(0);
  currentIcon = signal<string>('01d');
  backgroundImage = signal<string>(BACKGROUND_BASE_PATH + DEFAULT_BACKGROUND);
  loading = signal<boolean>(false);

  ngOnInit() {
    this.detectLocation();
  }

  detectLocation() {
    if ('geolocation' in navigator) {
      this.loading.set(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.geocodingService.getCityName(latitude, longitude).subscribe({
            next: (results) => {
              if (results && results.length > 0) {
                this.selectCity(results[0]);
              } else {
                this.loadWeatherData(latitude, longitude);
                this.cityName.set('Current Location');
              }
            },
            error: () => {
              this.loadWeatherData(latitude, longitude);
              this.cityName.set('Current Location');
            }
          });
        },
        (error) => {
          console.warn('Geolocation failed or denied:', error);
          this.searchCity('Madrid', true);
        },
        { timeout: 10000 }
      );
    } else {
      this.searchCity('Madrid', true);
    }
  }

  searchCity(city: string, autoSelect: boolean = false) {
    if (!city) {
      this.searchResults.set([]);
      return;
    }

    if (autoSelect) {
      this.loading.set(true);
    }

    this.geocodingService.getCoordinates(city, 5).subscribe({
      next: (coords) => {
        if (coords && coords.length > 0) {
          if (autoSelect) {
            this.selectCity(coords[0]);
          } else {
            this.searchResults.set(coords);
          }
        } else {
          if (autoSelect) this.loading.set(false);
          this.searchResults.set([]);
        }
      },
      error: () => {
        if (autoSelect) this.loading.set(false);
        this.searchResults.set([]);
      }
    });
  }

  selectCity(geocoding: Geocoding) {
    const { lat, lon, name, country, state } = geocoding;
    this.cityName.set(name);
    this.lastLat = lat;
    this.lastLon = lon;

    this.searchResults.set([]);

    this.loading.set(true);

    this.loadWeatherData(lat, lon);
  }
  private lastLat: number | null = null;
  private lastLon: number | null = null;

  loadWeatherData(lat: number, lon: number, langOverride?: string) {
    const currentLang = langOverride || this.translationService.currentLang();
    const lang = currentLang.split('-')[0];

    this.weatherService.getCurrentWeather(lat, lon, lang).subscribe({
      next: (weather) => {
        this.currentTemp.set(Number(weather.main.temp.toFixed(1)));
        const icon = weather.weather[0].icon;
        this.currentIcon.set(icon);

        const bgFile = WEATHER_BACKGROUNDS[icon] || DEFAULT_BACKGROUND;
        this.backgroundImage.set(BACKGROUND_BASE_PATH + bgFile);

        this.weatherService.getForecast(lat, lon, lang).subscribe({
          next: (forecast) => {
            const roundedList = forecast.list.map(item => ({
              ...item,
              main: {
                ...item.main,
                temp: Number(item.main.temp.toFixed(1))
              }
            }));
            this.forecasts.set(roundedList);
            this.dailyForecasts.set(this.mapDailyForecasts(roundedList));

            this.weatherDetails.set(this.mapWeatherDetails(weather, roundedList[0]?.pop));

            this.loading.set(false);
          },
          error: () => {
            this.weatherDetails.set(this.mapWeatherDetails(weather));
            this.loading.set(false);
          }
        });
      }
    });
  }

  private mapWeatherDetails(data: CurrentWeatherResponse, pop?: number): WeatherDetail[] {
    const details: WeatherDetail[] = [
      { icon: 'assets/icons/humidity.png', label: 'humidity_label', value: `${data.main.humidity}%` },
      { icon: 'assets/icons/wind_speed.png', label: 'wind_speed_label', value: `${data.wind.speed} km/h` },
      { icon: 'assets/icons/pressure.png', label: 'pressure_label', value: `${data.main.pressure} hPa` },
      { icon: 'assets/icons/visibility.png', label: 'visibility_label', value: `${(data.visibility / 1000).toFixed(1)} km` },
    ];

    const rain = data.rain?.['3h'] || 0;
    const snow = data.snow?.['3h'] || 0;
    const amount = rain + snow;
    const probability = pop !== undefined ? Math.round(pop * 100) : 0;

    if (amount > 0 || probability > 0) {
      details.push({
        icon: 'assets/icons/humidity.png',
        label: 'precipitation_label',
        value: `${probability}% (${amount.toFixed(1)} mm)`
      });
    }

    return details;
  }

  private mapDailyForecasts(list: ForecastInfo[]): DailyForecast[] {
    const dailyMap = new Map<string, ForecastInfo[]>();

    list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, []);
      }
      dailyMap.get(date)!.push(item);
    });

    const dailyForecasts: DailyForecast[] = [];
    dailyMap.forEach((hours) => {
      const temps = hours.map(h => h.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const midDay = hours.find(h => h.dt_txt.includes('12:00:00')) || hours[Math.floor(hours.length / 2)];

      dailyForecasts.push({
        dt: midDay.dt,
        icon: midDay.weather[0].icon,
        description: midDay.weather[0].description,
        minTemp: Number(minTemp.toFixed(1)),
        maxTemp: Number(maxTemp.toFixed(1))
      });
    });

    return dailyForecasts.slice(0, 5);
  }

  constructor() {
    addIcons({ locationOutline });
  }

  changeLanguage(event: any) {
    const lang = event.detail.value;
    this.translationService.loadTranslation(lang);

    if (this.lastLat !== null && this.lastLon !== null) {
      this.loadWeatherData(this.lastLat, this.lastLon, lang);
    }
  }
}
