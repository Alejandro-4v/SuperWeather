import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {Geocoding} from "../../shared/interfaces/geocoding.interfaces";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private http = inject(HttpClient);

  private apiKey = environment.apiKey;
  private geocodingApiUrl = environment.geocodingApiUrl;

  getCoordinates(city: string, limit: number): Observable<Geocoding[]> {
    const url = `${this.geocodingApiUrl}/direct?q=${city}&limit=${limit}&appid=${this.apiKey}`;
    return this.http.get<Geocoding[]>(url);
  }

  getCityName(lat: number, lon: number): Observable<Geocoding[]> {
    const url = `${this.geocodingApiUrl}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;
    return this.http.get<Geocoding[]>(url);
  }
}
