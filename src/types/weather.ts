export interface CurrentWeather {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

export interface ForecastDay {
  date: string;
  dayOfWeek: string;
  high: number;
  low: number;
  weatherCode: number;
  condition: string;
}

export interface AQIData {
  date: string;
  dayOfWeek: string;
  aqi: number;
  category: string;
  color: string;
}

export interface UVData {
  date: string;
  dayOfWeek: string;
  uvIndex: number;
  category: string;
  color: string;
}

export interface SunMoonData {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  currentUV: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  airQuality: AQIData[];
  uvForecast: UVData[];
  sunMoon: SunMoonData;
}
