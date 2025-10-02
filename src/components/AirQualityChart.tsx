import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { AQIData } from '../types/weather';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AirQualityChartProps {
  airQuality: AQIData[];
  darkMode: boolean;
}

export function AirQualityChart({ airQuality, darkMode }: AirQualityChartProps) {
  const labels = airQuality.map((day) => day.dayOfWeek.substring(0, 3));

  const data = {
    labels,
    datasets: [
      {
        label: 'Air Quality Index',
        data: airQuality.map((day) => day.aqi),
        backgroundColor: airQuality.map((day) => day.color),
        borderColor: airQuality.map((day) => day.color),
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        titleColor: darkMode ? '#f3f4f6' : '#111827',
        bodyColor: darkMode ? '#d1d5db' : '#374151',
        borderColor: darkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            const category = airQuality[index].category;
            return [`AQI: ${context.parsed.y}`, `Quality: ${category}`];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
        grid: {
          color: darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Air Quality Index</h3>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#22c55e' }}></div>
            <span className="text-gray-600 dark:text-gray-400">Good</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#eab308' }}></div>
            <span className="text-gray-600 dark:text-gray-400">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f97316' }}></div>
            <span className="text-gray-600 dark:text-gray-400">Sensitive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
            <span className="text-gray-600 dark:text-gray-400">Unhealthy</span>
          </div>
        </div>
      </div>
      <div className="h-64 md:h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
