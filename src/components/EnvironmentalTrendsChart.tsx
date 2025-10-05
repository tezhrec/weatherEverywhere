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
import type { EnvironmentalData } from '../types/weather';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface EnvironmentalTrendsChartProps {
  environmental: EnvironmentalData[];
  darkMode: boolean;
}

export function EnvironmentalTrendsChart({ environmental, darkMode }: EnvironmentalTrendsChartProps) {
  const labels = environmental.map((day) => day.dayOfWeek.substring(0, 3));

  const data = {
    labels,
    datasets: [
      {
        label: 'Pressure (hPa)',
        data: environmental.map((day) => day.pressure),
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(139, 92, 246)',
        yAxisID: 'y',
      },
      {
        label: 'Humidity (%)',
        data: environmental.map((day) => day.humidity),
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(34, 197, 94)',
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
            if (label.includes('Pressure')) {
              return `${label}: ${value} hPa`;
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
        title: {
          display: true,
          text: 'Pressure (hPa)',
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
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Humidity %',
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
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Environmental Trends</h3>
      <div className="h-64 md:h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
