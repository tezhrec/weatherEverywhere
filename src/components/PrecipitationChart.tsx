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
import type { PrecipitationData } from '../types/weather';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PrecipitationChartProps {
  precipitation: PrecipitationData[];
  darkMode: boolean;
}

export function PrecipitationChart({ precipitation, darkMode }: PrecipitationChartProps) {
  const labels = precipitation.map((day) => day.dayOfWeek.substring(0, 3));

  const data = {
    labels,
    datasets: [
      {
        label: 'Precipitation Amount (inches)',
        data: precipitation.map((day) => day.precipitationAmount),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 6,
        yAxisID: 'y',
      },
      {
        label: 'Chance of Rain (%)',
        data: precipitation.map((day) => day.precipitationProbability),
        backgroundColor: 'rgba(14, 165, 233, 0.6)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 2,
        borderRadius: 6,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: darkMode ? '#d1d5db' : '#374151',
          font: {
            size: 12,
          },
          padding: 15,
          usePointStyle: true,
        },
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
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label.includes('Amount')) {
              return `${label}: ${value.toFixed(2)} in`;
            } else {
              return `${label}: ${value}%`;
            }
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Inches',
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 12,
          },
        },
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
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Probability %',
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 12,
          },
        },
        grid: {
          drawOnChartArea: false,
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
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">5-Day Precipitation Forecast</h3>
      <div className="h-64 md:h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
