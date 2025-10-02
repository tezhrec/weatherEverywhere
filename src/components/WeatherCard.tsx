import { Droplets, Wind } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherIcons';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const { current } = weather;
  const WeatherIcon = getWeatherIcon(current.weatherCode);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-900 rounded-3xl shadow-2xl p-8 text-white transition-colors duration-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">{current.city}</h2>
          <p className="text-blue-100 text-lg">{current.condition}</p>
        </div>
        <WeatherIcon className="w-20 h-20 text-blue-100" />
      </div>

      <div className="flex items-baseline mb-8">
        <span className="text-7xl font-bold">{current.temperature}</span>
        <span className="text-4xl ml-2">°F</span>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-blue-400 dark:border-blue-600">
        <div className="flex items-center gap-3">
          <div className="bg-blue-400/30 dark:bg-blue-800/30 p-3 rounded-xl">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-sm">Humidity</p>
            <p className="text-xl font-semibold">{current.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-blue-400/30 dark:bg-blue-800/30 p-3 rounded-xl">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-sm">Wind Speed</p>
            <p className="text-xl font-semibold">{current.windSpeed} mph</p>
          </div>
        </div>
      </div>
    </div>
  );
}
