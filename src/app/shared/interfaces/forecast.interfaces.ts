import {CloudsInfo, MainInfo, RainInfo, SnowInfo, WeatherInfo, WindInfo} from "./weather.interfaces";
import {Coordinates} from "./common.interfaces";

export interface City {
  id: number,
  name: string,
  coord: Coordinates,
  country: string,
  population: number,
  timezone: number,
  sunrise: number,
  sunset: number
}

export interface SysInfo {
  pod: string
}

export interface ForecastInfo {
  dt: number,
  main: MainInfo,
  weather: WeatherInfo[],
  clouds: CloudsInfo,
  wind: WindInfo,
  visibility: number,
  pop: number,
  rain: RainInfo,
  snow: SnowInfo,
  sys: SysInfo,
  dt_txt: string
}

export interface ForecastResponse {
  cod: string,
  message: number,
  cnt: number,
  list: ForecastInfo[],
  city: City
}
