import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CurrentWeatherResponse} from '../../shared/interfaces/weather.interfaces';
import {ForecastResponse} from '../../shared/interfaces/forecast.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);

  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  getCurrentWeather(city: string): Observable<CurrentWeatherResponse> {
    const url = `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<CurrentWeatherResponse>(url);
  }

  getForecast(lat: number, lon: number): Observable<ForecastResponse> {
    const url = `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<ForecastResponse>(url);
  }

  getCurrentWeatherByCoords(lat: number, lon: number): Observable<CurrentWeatherResponse> {
    const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<CurrentWeatherResponse>(url);
  }
}
