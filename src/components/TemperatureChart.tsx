import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { ForecastDay } from '../types/weather';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TemperatureChartProps {
  forecast: ForecastDay[];
  darkMode: boolean;
}

export function TemperatureChart({ forecast, darkMode }: TemperatureChartProps) {
  const labels = forecast.map((day) => day.dayOfWeek.substring(0, 3));

  const data = {
    labels,
    datasets: [
      {
        label: 'High',
        data: forecast.map((day) => day.high),
        borderColor: darkMode ? '#f59e0b' : '#f97316',
        backgroundColor: darkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: darkMode ? '#f59e0b' : '#f97316',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Low',
        data: forecast.map((day) => day.low),
        borderColor: darkMode ? '#3b82f6' : '#2563eb',
        backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: darkMode ? '#3b82f6' : '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#e5e7eb' : '#374151',
          font: {
            size: 13,
            weight: '600' as const,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        titleColor: darkMode ? '#f3f4f6' : '#111827',
        bodyColor: darkMode ? '#d1d5db' : '#374151',
        borderColor: darkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y}°F`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 12,
          },
          callback: function (value: any) {
            return value + '°F';
          },
        },
      },
      x: {
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
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Temperature Trend</h3>
      <div className="h-64 md:h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
