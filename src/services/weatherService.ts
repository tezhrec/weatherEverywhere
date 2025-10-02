import type { WeatherData, CurrentWeather, ForecastDay, AQIData } from '../types/weather';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_API = 'https://air-quality-api.open-meteo.com/v1/air-quality';

interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

function getWeatherCondition(code: number): string {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 49) return 'Foggy';
  if (code <= 59) return 'Drizzle';
  if (code <= 69) return 'Rainy';
  if (code <= 79) return 'Snowy';
  if (code <= 84) return 'Showers';
  if (code <= 99) return 'Thunderstorm';
  return 'Unknown';
}

async function geocodeCity(cityName: string): Promise<GeocodingResult> {
  const response = await fetch(
    `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
  );

  if (!response.ok) {
    throw new Error('Failed to find city');
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('City not found');
  }

  return data.results[0];
}

async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  const response = await fetch(
    `${GEOCODING_API}?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`
  );

  if (!response.ok) {
    return 'My Location';
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return 'My Location';
  }

  const result = data.results[0];
  return `${result.name}, ${result.country}`;
}

function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5) + 32);
}

function getDayOfWeek(dateString: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  return days[date.getDay()];
}

function getAQICategory(aqi: number): { category: string; color: string } {
  if (aqi <= 50) return { category: 'Good', color: '#22c55e' };
  if (aqi <= 100) return { category: 'Moderate', color: '#eab308' };
  if (aqi <= 150) return { category: 'Unhealthy for Sensitive', color: '#f97316' };
  if (aqi <= 200) return { category: 'Unhealthy', color: '#ef4444' };
  if (aqi <= 300) return { category: 'Very Unhealthy', color: '#a855f7' };
  return { category: 'Hazardous', color: '#7f1d1d' };
}

export async function getWeatherData(cityName: string): Promise<WeatherData> {
  const location = await geocodeCity(cityName);

  const [weatherResponse, airQualityResponse] = await Promise.all([
    fetch(
      `${WEATHER_API}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&forecast_days=6`
    ),
    fetch(
      `${AIR_QUALITY_API}?latitude=${location.latitude}&longitude=${location.longitude}&hourly=us_aqi&timezone=auto&forecast_days=6`
    ),
  ]);

  if (!weatherResponse.ok) {
    throw new Error('Failed to fetch weather data');
  }

  if (!airQualityResponse.ok) {
    throw new Error('Failed to fetch air quality data');
  }

  const weatherData = await weatherResponse.json();
  const airQualityData = await airQualityResponse.json();

  const current: CurrentWeather = {
    city: `${location.name}, ${location.country}`,
    temperature: Math.round(weatherData.current.temperature_2m),
    condition: getWeatherCondition(weatherData.current.weather_code),
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: Math.round(weatherData.current.wind_speed_10m),
    weatherCode: weatherData.current.weather_code,
  };

  const forecast: ForecastDay[] = weatherData.daily.time.slice(1, 6).map((date: string, index: number) => ({
    date,
    dayOfWeek: getDayOfWeek(date),
    high: Math.round(weatherData.daily.temperature_2m_max[index + 1]),
    low: Math.round(weatherData.daily.temperature_2m_min[index + 1]),
    weatherCode: weatherData.daily.weather_code[index + 1],
    condition: getWeatherCondition(weatherData.daily.weather_code[index + 1]),
  }));

  const airQuality: AQIData[] = [];
  const dailyAQI: { [key: string]: number[] } = {};

  airQualityData.hourly.time.forEach((time: string, index: number) => {
    const date = time.split('T')[0];
    const aqi = airQualityData.hourly.us_aqi[index];

    if (aqi !== null && aqi !== undefined) {
      if (!dailyAQI[date]) {
        dailyAQI[date] = [];
      }
      dailyAQI[date].push(aqi);
    }
  });

  const dates = Object.keys(dailyAQI).slice(1, 6);
  dates.forEach((date) => {
    const aqiValues = dailyAQI[date];
    const avgAQI = Math.round(aqiValues.reduce((a, b) => a + b, 0) / aqiValues.length);
    const { category, color } = getAQICategory(avgAQI);

    airQuality.push({
      date,
      dayOfWeek: getDayOfWeek(date),
      aqi: avgAQI,
      category,
      color,
    });
  });

  return { current, forecast, airQuality };
}

export async function getWeatherByCoordinates(latitude: number, longitude: number): Promise<WeatherData> {
  const [weatherResponse, airQualityResponse, cityName] = await Promise.all([
    fetch(
      `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&forecast_days=6`
    ),
    fetch(
      `${AIR_QUALITY_API}?latitude=${latitude}&longitude=${longitude}&hourly=us_aqi&timezone=auto&forecast_days=6`
    ),
    reverseGeocode(latitude, longitude),
  ]);

  if (!weatherResponse.ok) {
    throw new Error('Failed to fetch weather data');
  }

  if (!airQualityResponse.ok) {
    throw new Error('Failed to fetch air quality data');
  }

  const weatherData = await weatherResponse.json();
  const airQualityData = await airQualityResponse.json();

  const current: CurrentWeather = {
    city: cityName,
    temperature: Math.round(weatherData.current.temperature_2m),
    condition: getWeatherCondition(weatherData.current.weather_code),
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: Math.round(weatherData.current.wind_speed_10m),
    weatherCode: weatherData.current.weather_code,
  };

  const forecast: ForecastDay[] = weatherData.daily.time.slice(1, 6).map((date: string, index: number) => ({
    date,
    dayOfWeek: getDayOfWeek(date),
    high: Math.round(weatherData.daily.temperature_2m_max[index + 1]),
    low: Math.round(weatherData.daily.temperature_2m_min[index + 1]),
    weatherCode: weatherData.daily.weather_code[index + 1],
    condition: getWeatherCondition(weatherData.daily.weather_code[index + 1]),
  }));

  const airQuality: AQIData[] = [];
  const dailyAQI: { [key: string]: number[] } = {};

  airQualityData.hourly.time.forEach((time: string, index: number) => {
    const date = time.split('T')[0];
    const aqi = airQualityData.hourly.us_aqi[index];

    if (aqi !== null && aqi !== undefined) {
      if (!dailyAQI[date]) {
        dailyAQI[date] = [];
      }
      dailyAQI[date].push(aqi);
    }
  });

  const dates = Object.keys(dailyAQI).slice(1, 6);
  dates.forEach((date) => {
    const aqiValues = dailyAQI[date];
    const avgAQI = Math.round(aqiValues.reduce((a, b) => a + b, 0) / aqiValues.length);
    const { category, color } = getAQICategory(avgAQI);

    airQuality.push({
      date,
      dayOfWeek: getDayOfWeek(date),
      aqi: avgAQI,
      category,
      color,
    });
  });

  return { current, forecast, airQuality };
}
