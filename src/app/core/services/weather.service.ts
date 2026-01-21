import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {CurrentWeatherResponse} from '@shared/interfaces/weather.interfaces';
import {ForecastResponse} from '@shared/interfaces/forecast.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);

  private apiKey = environment.apiKey;
  private weatherApiUrl = environment.weatherApiUrl;

  getCurrentWeather(lat: number, lon: number): Observable<CurrentWeatherResponse> {
    const url = `${this.weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<CurrentWeatherResponse>(url);
  }

  getForecast(lat: number, lon: number): Observable<ForecastResponse> {
    const url = `${this.weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<ForecastResponse>(url);
  }

  getCurrentWeatherByCoords(lat: number, lon: number): Observable<CurrentWeatherResponse> {
    const url = `${this.weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<CurrentWeatherResponse>(url);
  }
}
