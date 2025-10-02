import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudFog, CloudLightning } from 'lucide-react';

export function getWeatherIcon(weatherCode: number) {
  if (weatherCode === 0) return Sun;
  if (weatherCode <= 3) return Cloud;
  if (weatherCode <= 49) return CloudFog;
  if (weatherCode <= 59) return CloudDrizzle;
  if (weatherCode <= 69) return CloudRain;
  if (weatherCode <= 79) return CloudSnow;
  if (weatherCode <= 84) return CloudRain;
  if (weatherCode <= 99) return CloudLightning;
  return Cloud;
}
