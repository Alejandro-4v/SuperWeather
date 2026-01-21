import {Coordinates} from "./common.interfaces";

export interface WeatherInfo {
  id: number,
  main: string,
  description: string,
  icon: string
}

export interface MainInfo {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number,
  sea_level: number,
  grnd_level: number
}

export interface WindInfo {
  speed: number,
  deg: number
  gust: number
}

export interface CloudsInfo {
  all: number
}

export interface RainInfo {
  '3h': number
}

export interface SnowInfo {
  '3h': number
}

export interface SysInfo {
  type: number,
  id: number,
  country: string,
  sunrise: number,
  sunset: number
}

export interface CurrentWeatherResponse {
  coord: Coordinates,
  weather: WeatherInfo[],
  base: string,
  main: MainInfo,
  visibility: number,
  wind: WindInfo,
  clouds: CloudsInfo,
  rain?: RainInfo,
  snow?: SnowInfo,
  dt: number,
  sys: SysInfo,
  timezone: number,
  id: number,
  name: string,
  cod: number
}
