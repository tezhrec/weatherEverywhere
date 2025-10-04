import { getWeatherIcon } from '../utils/weatherIcons';
import type { ForecastDay } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastDay;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  const WeatherIcon = getWeatherIcon(forecast.weatherCode);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        {forecast.dayOfWeek}
      </h3>

      <WeatherIcon className="w-12 h-12 mx-auto mb-4 text-blue-500 dark:text-blue-400" />

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{forecast.condition}</p>

      <div className="flex justify-center items-center gap-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-500">High</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{forecast.high}°</p>
        </div>
        <div className="w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-500">Low</p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{forecast.low}°</p>
        </div>
      </div>
    </div>
  );
}
