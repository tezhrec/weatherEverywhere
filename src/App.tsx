import { useState, useEffect } from 'react';
import { Search, Sun, Moon, MapPin, Navigation, CloudSun } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { TemperatureChart } from './components/TemperatureChart';
import { AirQualityChart } from './components/AirQualityChart';
import { SunSkySection } from './components/SunSkySection';
import { getWeatherData, getWeatherByCoordinates } from './services/weatherService';
import type { WeatherData } from './types/weather';

interface SavedLocation {
  type: 'city' | 'coordinates';
  value: string | { lat: number; lon: number };
}

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const savedLocation = localStorage.getItem('lastLocation');
    if (savedLocation) {
      try {
        const location: SavedLocation = JSON.parse(savedLocation);
        loadSavedLocation(location);
      } catch (err) {
        console.error('Failed to load saved location:', err);
      }
    }
  }, []);

  const loadSavedLocation = async (location: SavedLocation) => {
    setLoading(true);
    setError('');

    try {
      let data: WeatherData;
      if (location.type === 'city' && typeof location.value === 'string') {
        setCity(location.value);
        data = await getWeatherData(location.value);
      } else if (location.type === 'coordinates' && typeof location.value === 'object') {
        data = await getWeatherByCoordinates(location.value.lat, location.value.lon);
      } else {
        return;
      }
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to load saved location:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);

      const savedLocation: SavedLocation = {
        type: 'city',
        value: city,
      };
      localStorage.setItem('lastLocation', JSON.stringify(savedLocation));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError('');
    setCity('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeatherData(data);

          const savedLocation: SavedLocation = {
            type: 'coordinates',
            value: { lat: latitude, lon: longitude },
          };
          localStorage.setItem('lastLocation', JSON.stringify(savedLocation));
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location permission denied. Please enable location access in your browser settings.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError('Location information unavailable. Please try again.');
        } else if (err.code === err.TIMEOUT) {
          setError('Location request timed out. Please try again.');
        } else {
          setError('Failed to get your location. Please try searching for a city instead.');
        }
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12 relative">
          <div className="flex justify-center items-center gap-3 mb-2">
            <CloudSun className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 dark:text-amber-400" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
              Weather Everywhere!
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Your personal weather companion for any location</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-0 right-0 p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-gray-800 dark:text-white dark:bg-gray-700 transition-colors duration-300 text-lg"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleUseLocation}
                disabled={loading}
                className="px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 disabled:hover:scale-100"
                title="Use my location"
              >
                <Navigation className="w-5 h-5" />
                <span className="hidden sm:inline">Use My Location</span>
              </button>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 sm:px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 disabled:hover:scale-100"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'Get Weather'}
              </button>
            </div>
          </div>
          {error && (
            <p className="mt-4 text-red-500 dark:text-red-400 text-center">{error}</p>
          )}
        </div>

        {weatherData && (
          <div className="space-y-8 animate-fadeIn">
            <WeatherCard weather={weatherData} />

            <SunSkySection
              uvForecast={weatherData.uvForecast}
              sunMoon={weatherData.sunMoon}
              darkMode={darkMode}
            />

            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">5-Day Forecast</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <ForecastCard key={index} forecast={day} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Charts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TemperatureChart forecast={weatherData.forecast} darkMode={darkMode} />
                <AirQualityChart airQuality={weatherData.airQuality} darkMode={darkMode} />
              </div>
            </div>
          </div>
        )}

        {!weatherData && !loading && (
          <div className="text-center py-20">
            <Sun className="w-24 h-24 text-amber-500 mx-auto mb-6 opacity-50" />
            <p className="text-xl text-gray-600 dark:text-gray-400">Search for a city to see the weather forecast</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
