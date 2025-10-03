import { Sunrise, Sunset, Moon, Sun } from 'lucide-react';
import { UVGauge } from './UVGauge';
import type { UVData, SunMoonData } from '../types/weather';

interface SunSkySectionProps {
  uvForecast: UVData[];
  sunMoon: SunMoonData;
  darkMode: boolean;
}

export function SunSkySection({ uvForecast, sunMoon, darkMode }: SunSkySectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Sun & Sky</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col items-center justify-center">
          <UVGauge uvIndex={sunMoon.currentUV} darkMode={darkMode} />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">5-Day UV Forecast</h4>
          <div className="space-y-3">
            {uvForecast.map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {day.dayOfWeek.substring(0, 3)}
                </div>
                <div className="flex-1 relative h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-lg transition-all duration-300"
                    style={{
                      width: `${(day.uvIndex / 11) * 100}%`,
                      backgroundColor: day.color,
                      minWidth: '20px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-xs font-semibold text-white drop-shadow-md">
                      {day.category}
                    </span>
                    <span className="text-xs font-bold text-white drop-shadow-md">
                      {day.uvIndex}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#22c55e' }}></div>
              <span className="text-gray-600 dark:text-gray-400">Low (0-2)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#eab308' }}></div>
              <span className="text-gray-600 dark:text-gray-400">Moderate (3-5)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f97316' }}></div>
              <span className="text-gray-600 dark:text-gray-400">High (6-7)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
              <span className="text-gray-600 dark:text-gray-400">Very High (8-10)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#a855f7' }}></div>
              <span className="text-gray-600 dark:text-gray-400">Extreme (11+)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4 flex flex-col items-center justify-center transition-colors duration-300">
          <Sunrise className="w-8 h-8 text-amber-500 mb-2" />
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sunrise</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{sunMoon.sunrise}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4 flex flex-col items-center justify-center transition-colors duration-300">
          <Sunset className="w-8 h-8 text-orange-500 mb-2" />
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sunset</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{sunMoon.sunset}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4 flex flex-col items-center justify-center transition-colors duration-300">
          <Moon className="w-8 h-8 text-blue-400 mb-2" />
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Moonrise</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{sunMoon.moonrise}</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4 flex flex-col items-center justify-center transition-colors duration-300">
          <Sun className="w-8 h-8 text-indigo-400 mb-2" />
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Moonset</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{sunMoon.moonset}</div>
        </div>
      </div>
    </div>
  );
}
